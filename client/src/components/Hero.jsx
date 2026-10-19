import React, { useState } from "react";
import { assets } from "../assets/data";
import { useAppContext } from "../context/AppContext";
import DateRangePicker from "./DateRangePicker";

const Hero = () => {
  const {navigate, searchedCities, setSearchedCities, axios, getToken, user} = useAppContext()
  const [destination, setDestination] = useState("")
  const [dates, setDates] = useState({pickUp: null, dropOff: null})

  const onSearch = async (e)=>{
    e.preventDefault()
    navigate(`/listing?destination=${destination}`)
    // API to save recent searched city (only for logged-in users)
    if(user) await axios.post('/api/user/store-recent-search',{recentSearchedCities: destination}, {headers: {Authorization: `Bearer ${await getToken()}`}})

    // Add destination to searchedCities max 3 recent searched cities
    setSearchedCities((prevSearchedCities)=>{
      const updatedSearchedCities = [...prevSearchedCities, destination] 
      if(updatedSearchedCities.length > 3){
        updatedSearchedCities.shift()
      }
      return updatedSearchedCities;
    })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primaryOne via-white to-white">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-solid/15 blur-3xl" />
      <div className="absolute top-40 -left-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      {/* CONTAINER */}
      <div className="max-padd-container relative flex justify-end mx-auto flex-col gap-9 py-6 pt-32 z-10">
        {/* Content */}
        <div className="relative z-30 flexCenter flex-col gap-y-6 fade-up">
          <span className="eyebrow bg-white ring-1 ring-solid/15 rounded-full px-4 py-1.5 shadow-soft">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Verified cars · Doorstep delivery
          </span>
          <div className="text-center max-w-5xl">
            <h1 className="capitalize leading-tight">
              Explore{" "}
              <span className="text-gradient">premium vehicles</span>{" "}
              available in exciting destinations.
            </h1>
            <p className="mt-4 text-base max-w-2xl mx-auto">
              Rent or buy inspected cars from trusted agencies across India — transparent pricing, flexible pickup and 24/7 support.
            </p>
          </div>
          {/* Search/Booking Form */}
          <form onSubmit={onSearch} className="bg-white text-gray-500 rounded-3xl p-3 grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-3 max-w-md md:max-w-4xl w-full ring-1 ring-slate-900/5 shadow-lift relative">
            <label htmlFor="destinationInput" className="flex flex-col items-start rounded-xl px-4 py-2.5 bg-primary border border-transparent focus-within:border-solid focus-within:bg-white focus-within:ring-4 focus-within:ring-solid/10 transition cursor-text">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-50">
                <img src={assets.pin} alt="pinIcon" width={14} /> Destination
              </span>
              <input
                onChange={(e)=> setDestination(e.target.value)}
                value={destination}
                list="destinations"
                id="destinationInput"
                type="text"
                className="w-full bg-transparent mt-0.5 text-sm font-semibold text-black outline-none capitalize placeholder:text-slate-400 placeholder:font-semibold"
                placeholder="Where to? Delhi, Mumbai..."
                required
              />
              <datalist id="destinations">
                {searchedCities.map((city, index)=>(
                    <option value={city} key={index} />
                ))}
              </datalist>
            </label>

            <DateRangePicker variant="hero" pickUp={dates.pickUp} dropOff={dates.dropOff} onChange={setDates} />

            <button type="submit" className="flexCenter gap-2 rounded-xl bg-solid hover:bg-solidDark transition text-white font-semibold py-3 px-7 cursor-pointer shadow-md shadow-solid/30">
              <img src={assets.search} alt="" width={18} className="invert" />
              <span>Search</span>
            </button>
          </form>
        </div>
        {/* Hero car */}
        <div className="relative flexCenter mt-4">
          <div className="absolute bottom-2 h-10 w-3/4 md:w-1/2 rounded-[100%] bg-slate-900/25 blur-2xl" />
          <img src={assets.heroCar} alt="heroCar" className="relative w-full md:w-[72%] fade-up drop-shadow-xl" />
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full mx-auto">
          {[
            ["3k+", "Cars listed"],
            ["120+", "Partner agencies"],
            ["25", "Cities covered"],
            ["4.9/5", "Customer rating"],
          ].map(([value, label]) => (
            <div key={label} className="card px-5 py-4 text-center">
              <h3 className="text-solid">{value}</h3>
              <p className="text-xs font-semibold uppercase tracking-wide mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
