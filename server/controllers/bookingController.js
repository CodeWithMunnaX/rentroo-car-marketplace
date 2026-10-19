import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import Agency from "../models/Agency.js";
import transporter from "../config/nodemailer.js";
import Razorpay from "razorpay";
import crypto from "crypto";


// INTERNAL HELPER
const checkAvailability = async ({ car, pickUpDate, dropOffDate }) => {
  try {
    const bookings = await Booking.find({
      car,
      pickUpDate: { $lte: dropOffDate },
      dropOffDate: { $gte: pickUpDate },
    });

    const isAvailable = bookings.length === 0
    return isAvailable;

  } catch (error) {
    console.log(error.message)
  }
};


// TO CHECK CAR AVAILABILITY [POST "/check-availability"]
export const checkBookingAvailability = async (req, res) => {
  try {
    const { car, pickUpDate, dropOffDate } = req.body;
    const isAvailable = await checkAvailability({
        car,
        pickUpDate,
        dropOffDate,
    })

    res.json({success:true, isAvailable})
  } catch (error) {
    res.json({success:false, message: error.message})
}
};

// CREATE A NEW BOOKING [POST "/book"]
export const bookingCreate = async (req,res)=>{
    try {
        const {car, pickUpDate, dropOffDate} = req.body
        const user = req.user._id
        
        const isAvailable = await checkAvailability({
            car,
            pickUpDate,
            dropOffDate,
        })
        
        if(!isAvailable){
            return res.json({success:false, message: "Car is not available"})
        }

        // Get Total Price from car
        const carData = await Car.findById(car).populate("agency")
        let totalPrice = carData.price.rent

        // Calculate totalPrice based on days
        const pickUp = new Date(pickUpDate)
        const dropOff = new Date(dropOffDate)
        const timeDiff = dropOff.getTime() - pickUp.getTime()
        const days = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)))

        totalPrice *= days

        const booking = await Booking.create({
            user,
            car,
            agency: carData.agency._id,
            pickUpDate,
            dropOffDate,
            totalPrice,
        })

        const mailOptions = {
          from: process.env.SENDER_EMAIL, // The email we have used for creating the brevo acc
          to: req.user.email,
          subject: "Car Booking/Sale",
          html: `
             <h2>Your Booking Details</h2>
             <p>Thank You for your booking! Below are your booing details:</p>
             <ul>
              <li><strong>Booking ID:</strong> ${booking._id}</li>
              <li><strong>Agency Name:</strong> ${carData.agency.name}</li>
              <li><strong>Location:</strong> ${carData.address}</li>
              <li><strong>Date:</strong> ${booking.pickUpDate.toDateString()}-${booking.dropOffDate.toDateString()}</li>
              <li><strong>Booking Amount:</strong> ${process.env.CURRENCY || "₹"}${
                booking.totalPrice
                } for ${days} days</li>
             </ul>
            <p>We are excited to welcome you soon.</p>
            <p>Need to change something? Contact us.</p>
            `,
        };

        // Email is best-effort: a missing/invalid SMTP config must not fail the booking
        try {
          await transporter.sendMail(mailOptions)
        } catch (mailError) {
          console.log("Booking email not sent:", mailError.message)
        }

        res.json({success:true, message: "Booking Created"})
    } catch (error) {
        res.json({success:false, message: error.message || "Failed to create Booking"})
        
    }
}

// GET BOOKINGS OF CURRENT USER [GET "/user"]
export const getUserBookings = async (req,res)=>{
    try {
        const user = req.user._id
        await reconcileRazorpayPayments({ user, isPaid: false, razorpayOrderId: { $exists: true } })
        const bookings = await Booking.find({user}).populate("car agency").sort({createdAt: -1})
        
        res.json({success:true, bookings})
    } catch (error) {
        res.json({success:true, message: "Failed to get Bookings"})
        
    }
}

// GET BOOKINGS FOR AGENCY [GET '/agency']
export const getAgencyBookings = async (req,res)=>{
    try {
        const user = req.user._id
        const agency = await Agency.findOne({owner: req.auth().userId})
        if(!agency){
            return res.json({success:false, message: "No Agency found"})
        }
        
        await reconcileRazorpayPayments({ agency: agency._id, isPaid: false, razorpayOrderId: { $exists: true } })
        const bookings = await Booking.find({agency: agency._id}).populate("car agency user").sort({createdAt: -1})
        const totalBookings = bookings.length
        const totalRevenue = bookings.reduce((acc, b)=> acc + (b.isPaid ? b.totalPrice: 0), 0)

        res.json({success:true, dashboardData: {totalBookings, totalRevenue, bookings}})
    } catch (error) {
        res.json({success:true, message: "Failed to get Agency Bookings"})
        
    }
}

// Razorpay instance (test/live decided by the keys in .env)
const getRazorpay = () =>
  new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

// Mark bookings paid when Razorpay already captured the payment but the
// browser never reached our verify call (tab closed, network drop, etc.)
const reconcileRazorpayPayments = async (filter) => {
  try {
    const pending = await Booking.find(filter);
    for (const booking of pending) {
      const order = await getRazorpay().orders.fetch(booking.razorpayOrderId);
      if (order.status === "paid") {
        booking.isPaid = true;
        booking.paymentMethod = "Razorpay";
        booking.status = "confirmed";
        await booking.save();
      }
    }
  } catch (error) {
    console.log("Razorpay reconcile failed:", error.error?.description || error.message);
  }
};

// CREATE RAZORPAY ORDER [POST "/razorpay/order"]
export const bookingRazorpayOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findOne({ _id: bookingId, user: req.user._id });
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }
    if (booking.isPaid) {
      return res.json({ success: false, message: "Booking already paid" });
    }

    const carData = await Car.findById(booking.car).populate("agency");
    const order = await getRazorpay().orders.create({
      amount: Math.round(booking.totalPrice * 100), // amount in paise
      currency: "INR",
      receipt: booking._id.toString(),
      notes: { bookingId: booking._id.toString(), car: carData?.title || "" },
    });
    booking.razorpayOrderId = order.id;
    await booking.save();

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
      agencyName: carData?.agency?.name || "Rentroo",
      carTitle: carData?.title || "",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.error?.description || "Payment Failed" });
  }
};

// VERIFY RAZORPAY PAYMENT [POST "/razorpay/verify"]
export const bookingRazorpayVerify = async (req, res) => {
  try {
    const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const valid =
      typeof razorpay_signature === "string" &&
      expected.length === razorpay_signature.length &&
      crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature));
    if (!valid) {
      return res.json({ success: false, message: "Payment verification failed" });
    }

    // Make sure this order really belongs to this booking
    const order = await getRazorpay().orders.fetch(razorpay_order_id);
    if (order.receipt !== bookingId) {
      return res.json({ success: false, message: "Order does not match booking" });
    }

    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, user: req.user._id },
      { isPaid: true, paymentMethod: "Razorpay", status: "confirmed", razorpayOrderId: razorpay_order_id, razorpayPaymentId: razorpay_payment_id },
      { new: true }
    );
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, message: "Payment Successful" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Payment verification failed" });
  }
};
