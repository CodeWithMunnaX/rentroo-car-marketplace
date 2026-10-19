import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/data";
import CarImages from "../components/CarImages";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import DateRangePicker from "../components/DateRangePicker";
import { daysBetween } from "../utils/dates";

const CarDetails = () => {
  const {currency, cars, navigate, axios, getToken, user} = useAppContext()
  const [car, setCar] = useState(null);
  const { id } = useParams();
  const [pickUpDate, setPickUpDate] = useState(null);
  const [dropOffDate, setDropOffDate] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);

  // CHECK AVAILABILITY
  const checkAvailability = async ()=>{
    try {
      if(!pickUpDate || !dropOffDate){
        return toast.error("Please select pick-up and drop-off dates")
      }
      if(pickUpDate >= dropOffDate){
        return toast.error("Drop-off date must be after pick-up date")
      }

      const {data} = await axios.post("/api/bookings/check-availability", {car: id, pickUpDate, dropOffDate})

      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success("Car is Available");
        } else {
          setIsAvailable(false);
          toast.error("Car is not available for these dates");
        }
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // BOOK CAR IF ISAVAILABLE
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {
      if (!isAvailable) {
        return checkAvailability();
      } else if (!user) {
        return toast.error("Please login to book this car");
      } else {
        const { data } = await axios.post(
          "/api/bookings/book",
          { car: id, pickUpDate, dropOffDate },
          { headers: { Authorization: `Bearer ${await getToken()}` } }
        );

        if (data.success) {
          toast.success(data.message);
          navigate("/my-bookings");
          scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  useEffect(() => {
    if (cars && cars.length > 0) {
      const foundCar = cars.find((c) => c._id === id);
      if (foundCar) {
        setCar(foundCar);
      }
    }
  }, [cars, id]);

  return (
    car && (
      <div className="bg-primary">
        <div className="max-padd-container px-6 pt-2 pb-16">
          {/* CONTAINER */}
          <div className="flex flex-col md:flex-row gap-6 mt-16">
            {/* INFO - LEFT SIDE */}
            <div className="flex-[5] card p-6 my-4">
              <p className="flexStart gap-x-2">
                <img src={assets.pin} alt="" width={19} />
                <span>{car.address}</span>
              </p>
              <div className="flex justify-between flex-col sm:flex-row sm:items-end mt-3">
                <h3>{car.title}</h3>
                <h4 className="text-solid">
                  {currency}{Number(car.price.sale).toLocaleString('en-IN')}
                  <span className="text-gray-50 font-medium"> | {currency}{Number(car.price.rent).toLocaleString('en-IN')}/day</span>
                </h4>
              </div>
              <div className="flex justify-between items-start my-1">
                <span className="eyebrow bg-primaryOne rounded-full px-3 py-1">{car.bodyType}</span>
                <div className="flex items-baseline gap-2 relative top-1.5">
                  <h4 className="relative bottom-0.5 text-black">5.0</h4>
                  <img src={assets.star} alt="starIcon" width={18} />
                  <img src={assets.star} alt="starIcon" width={18} />
                  <img src={assets.star} alt="starIcon" width={18} />
                  <img src={assets.star} alt="starIcon" width={18} />
                  <img src={assets.star} alt="starIcon" width={18} />
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <p className="flexCenter gap-x-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-textColor">
                  <img src={assets.transmission} alt="" width={19} />
                  {car.specs.transmission}
                </p>
                <p className="flexCenter gap-x-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-textColor">
                  <img src={assets.seats} alt="" width={19} />
                  {car.specs.seats}
                </p>
                <p className="flexCenter gap-x-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-textColor">
                  <img src={assets.fuelType} alt="" width={19} />
                  {car.specs.fuelType}
                </p>
                <p className="flexCenter gap-x-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-textColor">
                  <img src={assets.odometer} alt="" width={19} />
                  {Number(car.odometer).toLocaleString('en-IN')} km
                </p>
              </div>
              <div className="mt-6">
                <h4 className="mt-4 mb-1">Car Details</h4>
                <p className="mb-4">{car.description}</p>
              </div>
              <h4 className="mt-6 mb-2">Features</h4>
              <div className="flex gap-3 flex-wrap">
                {car.features.map((feature) => (
                  <p key={feature} className="px-3 py-1.5 rounded-full bg-primaryOne text-solid font-semibold text-xs">✓ {" "}
                    {feature}
                  </p>
                ))}
              </div>
              {/* FORM | Check Availability */}
              <form onSubmit={onSubmitHandler} className="bg-gradient-to-br from-primaryOne to-primary rounded-2xl p-4 sm:p-5 ring-1 ring-solid/10 relative mt-10">
                <div className="flexBetween mb-3">
                  <h4>Book this car</h4>
                  {isAvailable && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Available
                    </span>
                  )}
                </div>
                <div className="flex flex-col lg:flex-row gap-3 lg:items-stretch">
                  <div className="flex-1">
                    <DateRangePicker
                      pickUp={pickUpDate}
                      dropOff={dropOffDate}
                      onChange={({pickUp, dropOff})=>{ setPickUpDate(pickUp); setDropOffDate(dropOff); setIsAvailable(false) }}
                    />
                  </div>
                  <button type="submit" className="flexCenter gap-2 btn-solid !rounded-xl min-w-44">
                    <img src={assets.search} alt="searchIcon" width={18} className="invert" />
                    <span>{isAvailable ? "Book Car" : "Check Dates"}</span>
                  </button>
                </div>
                {/* Price summary */}
                {pickUpDate && dropOffDate && (
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div className="bg-white rounded-xl py-2.5">
                      <p className="text-[11px] uppercase font-semibold tracking-wide">Per day</p>
                      <h5>{currency}{Number(car.price.rent).toLocaleString('en-IN')}</h5>
                    </div>
                    <div className="bg-white rounded-xl py-2.5">
                      <p className="text-[11px] uppercase font-semibold tracking-wide">Duration</p>
                      <h5>{daysBetween(pickUpDate, dropOffDate)} day{daysBetween(pickUpDate, dropOffDate) > 1 ? "s" : ""}</h5>
                    </div>
                    <div className="bg-solid text-white rounded-xl py-2.5">
                      <p className="text-[11px] uppercase font-semibold tracking-wide !text-white/80">Total</p>
                      <h5 className="!text-white">{currency}{(car.price.rent * daysBetween(pickUpDate, dropOffDate)).toLocaleString('en-IN')}</h5>
                    </div>
                  </div>
                )}
              </form>
              {/* Contact Agency */}
              <div className="p-6 bg-primary rounded-xl mt-10 max-w-sm">
                <h4 className="mb-3">For Buying Contact</h4>
                <div className="text-sm sm:w-80 divide-y divide-gray-500/30 ring-1 ring-slate-900/10 rounded">
                  <div className="flex items-start justify-between p-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h5>{car.agency.name}</h5>
                        <p className="bg-green-500/20 px-2 py-0.5 rounded-full text-xs text-green-600 border border-green-500/30">Agency</p>
                      </div>
                      <p>Agency Office</p>
                    </div>
                    <img src={car.agency.owner.image} alt="" className="h-10 w-10 rounded-full"/>
                  </div>
                  <div className="flexStart gap-2 p-1 5">
                    <div className="bg-green-500/20 p-1 rounded-full border border-green-500/30">
                      <img src={assets.phone} alt="" width={14} />
                    </div>
                    <p>{car.agency.contact}</p>
                  </div>
                  <div className="flexStart gap-2 p-1 5">
                    <div className="bg-green-500/20 p-1 rounded-full border border-green-500/30">
                      <img src={assets.mail} alt="" width={14} />
                    </div>
                    <p>{car.agency.email}</p>
                  </div>
                  <div className="flex items-center divide-x divide-gray-500/30">
                    <button className="flex items-center justify-center gap-2 w-1/2 py-3 cursor-pointer">
                      <img src={assets.mail} alt="" width={19} />
                      Send Email
                    </button>
                    <button className="flex items-center justify-center gap-2 w-1/2 py-3 cursor-pointer">
                      <img src={assets.phone} alt="" width={19} />
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* IMAGES - RIGHT SIDE */}
            <div className="flex flex-[4] w-full card p-4 my-4 self-start md:sticky md:top-20">
              <CarImages car={car}/>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CarDetails;
