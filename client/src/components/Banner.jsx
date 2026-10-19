import React from 'react'
import { assets } from '../assets/data'
import { useNavigate } from "react-router-dom"

const Banner = () => {
    const navigate = useNavigate()

  return (
    <section className='max-padd-container py-10 pt-22'>
        <div className='relative overflow-hidden rounded-3xl'>
            {/* Background photo + overlay */}
            <img src={assets.banner} alt="bannerImg" className='absolute inset-0 h-full w-full object-cover' />
            <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-solidDark/75 to-solid/30' />
            {/* CONTAINER */}
            <div className='relative flex flex-col md:flex-row items-center gap-6 px-6 md:px-12 py-12'>
                {/* LEFT SIDE */}
                <div className='flex-[5] text-white'>
                    <span className='eyebrow !text-white/80'>Rent · Buy · Sell</span>
                    <h3 className='capitalize !text-white mt-3 max-w-xl'>Buy with confidence, rent without worry</h3>
                    <p className='!text-white/75 mt-3 max-w-lg text-base'>
                      Find your next ride or earn from your vehicle in minutes. We handle insurance, driver verification and secure payments.
                    </p>
                    <div className='flex flex-wrap gap-3 mt-6'>
                      <button onClick={()=>{navigate("/listing"); scrollTo(0,0)}} className='btn-white'>Explore cars</button>
                      <button onClick={()=>{navigate("/contact"); scrollTo(0,0)}} className='btn-outline !text-white !border-white/30 hover:!bg-white/10'>Talk to us</button>
                    </div>
                </div>
                {/* RIGHT SIDE */}
                <div className='flex-[4] flexCenter'>
                    <img src={assets.bannerCar} alt="bannerCar" className='w-full max-w-md drop-shadow-2xl' />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Banner
