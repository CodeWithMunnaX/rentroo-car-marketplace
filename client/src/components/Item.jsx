import React from 'react'
import { assets } from '../assets/data'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'


const Item = ({car}) => {
    const {currency} = useAppContext()
    const navigate = useNavigate()
    const formatPrice = (value) => Number(value || 0).toLocaleString('en-IN')

    // soft tints to cycle through behind the car image
    const colors = ["#eef4ff", "#fff4eb", "#ecfdf5", "#f5f7fb"];
    // compute an index from car._id parseInt fallback to 0 for safety
    const bgColor = colors[parseInt(car._id?.slice(-4) || "0", 16) % colors.length]


  return (
    <div onClick={()=>{navigate("/listing/" +car._id); scrollTo(0,0)}}
     className='group block card p-4 cursor-pointer transition duration-300 hover:-translate-y-1 hover:shadow-lift'
    >
      {/* Image */}
      <div className='relative rounded-xl overflow-hidden flexCenter h-44' style={{backgroundColor: bgColor}}>
        <span className='absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wide bg-white/90 text-black px-2.5 py-1 rounded-full'>
          {car.bodyType}
        </span>
        {car.isAvailable && (
          <span className='absolute top-3 right-3 flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full'>
            <span className='h-1.5 w-1.5 rounded-full bg-green-500' /> Available
          </span>
        )}
        <img src={car.images[0]} alt={car.title} className='max-h-32 max-w-[88%] object-contain transition duration-500 group-hover:scale-105' />
      </div>
      {/* Title & Price */}
      <div className='pt-4'>
        <h4 className='line-clamp-1'>{car.title}</h4>
        <p className='flex items-center gap-1 text-xs mt-0.5 line-clamp-1'>
          <img src={assets.pin} alt="" width={12} />
          {car.city}, {car.country}
        </p>
      </div>
      {/* Specs */}
      <div className='grid grid-cols-4 gap-2 py-4'>
        {[
          [assets.transmission, car.specs.transmission],
          [assets.seats, `${car.specs.seats} Seats`],
          [assets.fuelType, car.specs.fuelType],
          [assets.odometer, `${formatPrice(car.odometer)} km`],
        ].map(([icon, label]) => (
          <div key={label} className='flexCenter flex-col gap-1 rounded-lg bg-primary py-2 text-[11px] font-semibold text-textColor text-center'>
            <img src={icon} alt="" width={17} />
            <span className='line-clamp-1'>{label}</span>
          </div>
        ))}
      </div>
      <p className='line-clamp-2 text-[13px]'>{car.description}</p>
      {/* Footer */}
      <div className='flexBetween mt-4 pt-4 border-t border-slate-900/5'>
        <div>
          <p className='text-[11px] uppercase tracking-wide font-semibold'>Rent</p>
          <h5 className='text-solid'>{currency}{formatPrice(car.price.rent)}<span className='text-xs text-gray-50 font-medium'>/day</span></h5>
        </div>
        <div className='text-right'>
          <p className='text-[11px] uppercase tracking-wide font-semibold'>Buy</p>
          <h5>{currency}{formatPrice(car.price.sale)}</h5>
        </div>
      </div>
    </div>
  )
}

export default Item
