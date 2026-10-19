import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    user:{type:String, required:true},
    car:{type:String, ref:"Car", required:true},
    agency:{type:String, ref:"Agency", required:true},
    pickUpDate:{type:Date, required:true},
    dropOffDate:{type:Date, required:true},
    totalPrice:{type:Number, required:true},
    status:{type:String, enum:["pending", "confirmed", "cancelled"], default:"pending"},
    paymentMethod:{type:String, required:true, default:"Pay at pickup"},
    isPaid:{type:Boolean, default:false},
    razorpayOrderId:{type:String},
    razorpayPaymentId:{type:String},
}, {timestamps: true})

const Booking = mongoose.model("Booking", bookingSchema)

export default Booking