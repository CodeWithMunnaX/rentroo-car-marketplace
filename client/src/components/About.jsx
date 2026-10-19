import React from 'react'
import Title from './Title'
import {assets} from "../assets/data"

const features = [
  {
    title: "Wide Vehicle Selection",
    text: "Choose from hatchbacks to luxury sedans, regularly maintained and verified, giving you reliable performance and the perfect car for every trip.",
    bg: "bg-primaryOne",
    dot: "bg-solid",
  },
  {
    title: "Quick Service",
    text: "Book in seconds with instant confirmations and flexible pickup options, so you get on the road fast without waiting or hassles.",
    bg: "bg-primaryTwo",
    dot: "bg-accent",
  },
  {
    title: "Transparent Pricing",
    text: "Upfront rates with no hidden fees, clear breakdowns for insurance and extras, so pricing stays predictable before booking.",
    bg: "bg-primaryThree",
    dot: "bg-green-500",
  },
  {
    title: "24/7 Support",
    text: "Around the clock support via chat and phone, helping with changes, extensions, or roadside assistance anytime you need.",
    bg: "bg-primary",
    dot: "bg-black",
  },
]

const About = () => {
  return (
    <section className='max-padd-container py-16 xl:py-22 !pt-28'>
        {/* CONTAINER */}
        <div className='flex items-center flex-col lg:flex-row gap-14'>
            {/* INFO - LEFT SIDE */}
            <div className='flex-[5]'>
                    <Title
                    title1={"Your Trusted Car Rental Partner"}
                    title2={"Helping You Every Step of the Way"}
                    paraStyles={"hidden"}
                    />
                    <p className='mb-10 mt-5 text-base'>Find reliable cars with transparent pricing, verified inspections, flexible pickup and delivery options, and 24/7 customer support for a smooth rental or buying experience.</p>
                    <div className='grid gap-5 md:grid-cols-2'>
                        {features.map((item)=>(
                          <div key={item.title} className={`p-5 rounded-2xl ${item.bg} ring-1 ring-slate-900/5 transition hover:-translate-y-0.5`}>
                              <div className='flex items-center gap-2'>
                                <span className={`h-2.5 w-2.5 rounded-full ${item.dot}`} />
                                <h5>{item.title}</h5>
                              </div>
                              <p className='text-sm mt-2'>{item.text}</p>
                          </div>
                        ))}
                    </div>
            </div>
            {/* IMAGE - RIGHT SIDE */}
            <div className='flex-[4] flex gap-5 lg:gap-7'>
                <div className='relative flex-1 mb-10'>
                    <img src={assets.about1} alt="aboutImg" className='rounded-3xl w-full aspect-[4/5] object-cover shadow-soft' />
                    <div className='absolute -bottom-6 left-4 right-4 card p-3 flex items-center gap-3'>
                      <div className='h-10 w-10 rounded-full bg-solid flexCenter text-white font-bold'>✓</div>
                      <div>
                        <h5 className='text-sm'>200-point inspection</h5>
                        <p className='text-xs'>On every listed car</p>
                      </div>
                    </div>
                </div>
                <div className='relative flex-1 mt-10'>
                    <img src={assets.about2} alt="aboutImg" className='rounded-3xl w-full aspect-[4/5] object-cover shadow-soft' />
                    <div className='absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow'>
                      Visit our hubs
                    </div>
                </div>
            </div>
        </div>

    </section>
  )
}

export default About
