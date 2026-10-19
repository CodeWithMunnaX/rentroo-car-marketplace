import React, {useEffect, useState} from 'react'
import { assets } from '../assets/data'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'


const MyBookings = () => {
  const {currency, user, axios, getToken} = useAppContext()
  const [bookings, setBookings] = useState([])

  const getUserBooking = async ()=>{
    try {
      const {data} = await axios.get('/api/bookings/user', {headers: {Authorization: `Bearer ${await getToken()}`}})
      if(data.success){
        setBookings(data.bookings)
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Load Razorpay checkout script once
  const loadRazorpay = ()=> new Promise((resolve)=>{
    if(window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = ()=> resolve(true)
    script.onerror = ()=> resolve(false)
    document.body.appendChild(script)
  })

  // RAZORPAY PAYMENT
  const handlePayment = async (bookingId)=>{
    try {
      const loaded = await loadRazorpay()
      if(!loaded){
        return toast.error("Could not load Razorpay. Check your connection.")
      }

      const {data} = await axios.post('/api/bookings/razorpay/order', {bookingId}, {headers: {Authorization: `Bearer ${await getToken()}`}})
      if(!data.success){
        return toast.error(data.message)
      }

      const razorpay = new window.Razorpay({
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "Rentroo",
        description: `${data.carTitle} · ${data.agencyName}`,
        prefill: {
          name: user?.fullName || "",
          email: user?.primaryEmailAddress?.emailAddress || "",
        },
        theme: {color: "#2563eb"},
        handler: async (response)=>{
          try {
            const {data: verify} = await axios.post('/api/bookings/razorpay/verify', {bookingId, ...response}, {headers: {Authorization: `Bearer ${await getToken()}`}})
            if(verify.success){
              toast.success(verify.message)
              getUserBooking()
            }else{
              toast.error(verify.message)
            }
          } catch (error) {
            toast.error(error.message)
          }
        },
      })
      razorpay.on('payment.failed', (response)=> toast.error(response.error?.description || "Payment failed"))
      razorpay.open()
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user){
      getUserBooking()
    }
  }, [user])

  return (
    <div className='bg-primary py-16 pt-28'>
      <div className='max-padd-container'>
       <Title
        title2={"My Bookings"}
        title2Styles={"text-4xl"}
        titleStyles={"mb-10"}
      />
        {bookings.length === 0 && (
          <div className='card p-10 text-center'>
            <h4>No bookings yet</h4>
            <p className='mt-1'>Browse cars and book your first ride.</p>
          </div>
        )}
        {bookings?.map((booking)=>(
          <div key={booking._id} className='card p-3 pr-5 mt-4 transition hover:shadow-lift'>
            {/* Car List */}
            <div className='flexStart gap-3 mb-3'>
              <div className='bg-primaryOne rounded-xl overflow-hidden flexCenter h-20 w-32 p-2 shrink-0'>
                <img src={booking.car.images[0]} alt="" className='max-w-full max-h-full object-contain'/>
              </div>
              <div>
                <h5 className='capitalize line-clamp-1'>{booking.car.title}</h5>
                <div className='flex gap-4'>
                  <div className='flex items-center gap-x-2'>
                    <h5>Seats</h5>
                    <p>{booking.car.specs.seats}</p>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <h5>Total:</h5>
                    <p className='text-solid font-bold text-sm'>{currency}{Number(booking.totalPrice).toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <p className='flex place-items-baseline gap-1 mt-0.5'>
                  <img src={assets.pin} alt="" width={13} />
                  {booking.car.address}
                </p>
              </div>
            </div>
            {/* Booking Summary */}
            <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 border-t border-slate-900/5 pt-3'>
              <div className='flex gap-2 gap-x-4 flex-wrap'>
                <div className='flex items-center gap-x-2'>
                  <h5>Booking ID:</h5>
                  <p className='text-gray-400 text-xs'>{booking._id}</p>
                </div>
                <div className='flex items-center gap-x-2'>
                  <h5>Pick-Up:</h5>
                  <p className='text-gray-400 text-xs'>{new Date(booking.pickUpDate).toLocaleDateString('en-IN', {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'})}</p>
                </div>
                <div className='flex items-center gap-x-2'>
                  <h5>Drop-Off:</h5>
                  <p className='text-gray-400 text-xs'>{new Date(booking.dropOffDate).toLocaleDateString('en-IN', {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'})}</p>
                </div>
              </div>
              <div className='flex gap-2 gap-x-3'>
                <div className='flex items-center gap-x-2'>
                  <h5>Payment:</h5>
                  <div className='flex items-center gap-1'>
                    <span className={`min-w-2.5 h-2.5 rounded-full ${
                      booking.isPaid ? "bg-green-500" : "bg-yellow-500"
                    }`} />
                    <p className={booking.isPaid ? 'text-green-700 font-semibold' : 'text-amber-700 font-semibold'}>{booking.isPaid ? "Paid" : "Unpaid"}</p>
                  </div>
                </div>
                {!booking.isPaid && (
                  <button onClick={()=> handlePayment(booking._id)} className='btn-solid !py-1.5 !px-4 !text-xs'>Pay Now</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings