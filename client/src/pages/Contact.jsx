import React from 'react'
import { assets } from '../assets/data'
import toast from 'react-hot-toast'

const Contact = () => {
  const onSubmit = (e) => {
    e.preventDefault()
    toast.success("Thanks! We'll get back to you within 24 hours.")
    e.target.reset()
  }

  return (
    <div className="bg-gradient-to-b from-primaryOne to-white py-16 pt-28">
     <div className="max-padd-container grid lg:grid-cols-2 gap-10 items-center">
     <div className="relative hidden lg:block">
      <img src={assets.contact} alt="contactImg" className="rounded-3xl w-full aspect-[4/3] object-cover shadow-soft" />
      <div className="absolute -bottom-6 left-6 right-6 card p-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primaryOne flexCenter"><img src={assets.phone} alt="" width={16} /></div>
          <div><h5 className="text-sm">Call us</h5><p className="text-xs">+91 98765 43210</p></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primaryTwo flexCenter"><img src={assets.pin} alt="" width={16} /></div>
          <div><h5 className="text-sm">Visit a hub</h5><p className="text-xs">25 cities across India</p></div>
        </div>
      </div>
     </div>
     <form onSubmit={onSubmit} className='card p-8 md:p-10 flex flex-col items-center text-sm text-slate-800'>
      <span className="eyebrow bg-primaryOne rounded-full px-3 py-1">Contact Us</span> 
      <h1 className="text-4xl font-bold py-4 text-center">Let’s Get In Touch.</h1>
      <p className="max-md:text-sm text-gray-500 pb-10 text-center">
          Or just reach out manually to us at <a href="#" className="text-solid hover:underline"> contact@rentroo.com</a>
      </p>
      
      <div className="max-w-96 w-full px-4">
          <label htmlFor="name" className="font-medium">Full Name</label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-200 bg-white rounded-full focus-within:ring-2 focus-within:ring-solid/40 transition-all overflow-hidden">
              <img src={assets.user} alt="" width={19} className='invert-50'/>
              <input type="text" className="h-full px-2 w-full outline-none bg-transparent" placeholder="Enter your full name" required />
          </div>
  
          <label htmlFor="email-address" className="font-medium mt-4">Email Address</label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-200 bg-white rounded-full focus-within:ring-2 focus-within:ring-solid/40 transition-all overflow-hidden">
              <img src={assets.mail} alt="" width={18} className='invert-50'/>
              <input type="email" className="h-full px-2 w-full outline-none bg-transparent" placeholder="Enter your email address" required />
          </div>
  
          <label htmlFor="message" className="font-medium mt-4">Message</label>
          <textarea rows="4" className="w-full mt-2 p-2 border border-slate-200 bg-white rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-solid/40 transition-all" placeholder="Enter your message" required></textarea>
          
          <button type="submit" className="flexCenter gap-1 mt-5 btn-solid w-full !font-bold">
              Submit Form
              <img src={assets.right} alt="" className='invert' />
          </button>
      </div>
     </form>
     </div>
    </div>
  )
}

export default Contact