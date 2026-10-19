import React, { useState } from "react";
import { assets } from "../../assets/data";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { axios, getToken } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    city: "",
    country: "",
    address: "",
    odometer: "",
    bodyType: "",
    priceRent: "",
    priceSale: "",
    transmission: "",
    seats: "",
    fuelType: "",
    features: {
      "Rear Camera": false,
      "Apple CarPlay": false,
      "Keyless Entry": false,
      "Adaptive Cruise": false,
      "Heated Seats": false,
      Sunroof: false,
      "Parking Assist": false,
      "Cruise Control": false,
    },
  });

  const bodyTypes = [
    "SUV",
    "MUV",
    "Sedan",
    "Hatchback",
    "Coupe",
    "Convertible",
    "Van",
    "Grand Tourer",
  ];
  const transmissions = ["Automatic", "Manual", "CVT", "Dual-clutch"];
  const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Check if all inputs are filled
    if (
      !inputs.title ||
      !inputs.description ||
      !inputs.city ||
      !inputs.country ||
      !inputs.address ||
      !inputs.odometer ||
      !inputs.bodyType ||
      (!inputs.priceRent && !inputs.priceSale) ||
      !inputs.transmission ||
      !inputs.seats ||
      !inputs.fuelType
    ) {
      toast.error("Please fill all required fields")
      return
    }

    // Check if at least 1 image is uploaded
    const hasImage = Object.values(images).some(img => img !== null) 
    if(!hasImage){
      toast.error("Please upload at least one image")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("city", inputs.city);
      formData.append("country", inputs.country);
      formData.append("address", inputs.address);
      formData.append("odometer", inputs.odometer);
      formData.append("bodyType", inputs.bodyType);
      formData.append("transmission", inputs.transmission);
      formData.append("seats", inputs.seats);
      formData.append("fuelType", inputs.fuelType);
      formData.append("priceRent", inputs.priceRent ? Number(inputs.priceRent) : "")
      formData.append("priceSale", inputs.priceSale ? Number(inputs.priceSale) : "")
      // Converting features to array & keeping only enabled features
      const features = Object.keys(inputs.features).filter(key=> inputs.features[key])
      formData.append("features", JSON.stringify(features))

      // Adding images to FormData
      Object.keys(images).forEach((key)=> {
        images[key] && formData.append("images", images[key])
      })

      const { data } = await axios.post("/api/cars", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if(data.success){
        toast.success(data.message);
        // Reset form after success
        setInputs({
          title: "",
          description: "",
          city: "",
          country: "",
          address: "",
          odometer: "",
          bodyType: "",
          priceRent: "",
          priceSale: "",
          transmission: "",
          seats: "",
          fuelType: "",
          features: {
            "Rear Camera": false,
            "Apple CarPlay": false,
            "Keyless Entry": false,
            "Adaptive Cruise": false,
            "Heated Seats": false,
            Sunroof: false,
            "Parking Assist": false,
            "Cruise Control": false,
          },
        });
        setImages({ 1: null, 2: null, 3: null, 4: null });

      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="px-3 md:px-8 py-6 xl:py-8 m-1.5 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 card">
      <div className="mb-6">
        <span className="eyebrow">New listing</span>
        <h3 className="mt-1">Add a Car</h3>
        <p className="mt-1">Fill in the details and upload up to 4 photos. Images are stored on Cloudinary.</p>
      </div>
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-y-4 px-1 text-sm font-medium xl:max-w-3xl">
        <div className="w-full">
          <h5 className="text-sm">Car Name</h5>
          <input
            onChange={(e)=> setInputs({...inputs, title: e.target.value})}
            value={inputs.title}
            type="text"
            placeholder="Type here..."
            className="px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-primary mt-1.5 outline-none focus:ring-2 focus:ring-solid/40 focus:bg-white transition w-full"
          />
        </div>
        <div className="w-full">
          <h5 className="text-sm">Car Description</h5>
          <textarea
            onChange={(e)=> setInputs({...inputs, description: e.target.value})}
            value={inputs.description}
            rows={5}
            type="text"
            placeholder="Type here..."
            className="px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-primary mt-1.5 outline-none focus:ring-2 focus:ring-solid/40 focus:bg-white transition w-full"
          />
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <h5 className="text-sm">City</h5>
            <input
            onChange={(e)=> setInputs({...inputs, city: e.target.value})}
            value={inputs.city}
              type="text"
              placeholder="Type here..."
              className="px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-primary mt-1.5 outline-none focus:ring-2 focus:ring-solid/40 focus:bg-white transition w-full"
            />
          </div>
          <div className="w-full">
            <h5 className="text-sm">Country</h5>
            <input
            onChange={(e)=> setInputs({...inputs, country: e.target.value})}
            value={inputs.country}
              type="text"
              placeholder="Type here..."
              className="px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-primary mt-1.5 outline-none focus:ring-2 focus:ring-solid/40 focus:bg-white transition w-full"
            />
          </div>
          <div>
            <h5 className="text-sm">Car Type</h5>
            <select
            onChange={(e)=> setInputs({...inputs, bodyType: e.target.value})}
            value={inputs.bodyType}
            className="w-36 px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-primary mt-1.5 outline-none focus:ring-2 focus:ring-solid/40 focus:bg-white transition">
              <option>Select Type</option>
              {bodyTypes.map((bt) => (
                <option key={bt} value={bt}>{bt}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap w-full">
          <div className="flex-[1]">
            <h5 className="text-sm">Address</h5>
            <input
            onChange={(e)=> setInputs({...inputs, address: e.target.value})}
            value={inputs.address}
              type="text"
              placeholder="Type here..."
              className="px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-primary mt-1.5 outline-none focus:ring-2 focus:ring-solid/40 focus:bg-white transition w-full"
            />
          </div>
          <div className="w-34">
            <h5 className="text-sm">Odometer</h5>
            <input
            onChange={(e)=> setInputs({...inputs, odometer: e.target.value})}
            value={inputs.odometer}
              type="number"
              placeholder="e.g. 2,500(km)"
              className="px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-primary mt-1.5 outline-none focus:ring-2 focus:ring-solid/40 focus:bg-white transition w-full"
            />
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          <div>
            <h5 className="text-sm">
              Rent Price <span className="text-xs">/day</span>
            </h5>
            <input
            onChange={(e)=> setInputs({...inputs, priceRent: e.target.value})}
            value={inputs.priceRent}
              type="number"
              placeholder="99"
              className="w-28 px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-primary mt-1.5 outline-none focus:ring-2 focus:ring-solid/40 focus:bg-white transition"
            />
          </div>
          <div>
            <h5 className="text-sm">Sale Price</h5>
            <input
            onChange={(e)=> setInputs({...inputs, priceSale: e.target.value})}
            value={inputs.priceSale}
              type="number"
              placeholder="9999"
              className="w-28 px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-primary mt-1.5 outline-none focus:ring-2 focus:ring-solid/40 focus:bg-white transition"
            />
          </div>
          <div>
            <h5 className="text-sm">Transmission</h5>
            <select
            onChange={(e)=> setInputs({...inputs, transmission: e.target.value})}
            value={inputs.transmission}
            className="w-36 px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-primary mt-1.5 outline-none focus:ring-2 focus:ring-solid/40 focus:bg-white transition">
              <option>Select Type</option>
              {transmissions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <h5 className="text-sm">Seats</h5>
            <input
            onChange={(e)=> setInputs({...inputs, seats: e.target.value})}
            value={inputs.seats}
              type="number"
              placeholder="1"
              className="w-20 px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-primary mt-1.5 outline-none focus:ring-2 focus:ring-solid/40 focus:bg-white transition"
            />
          </div>
          <div>
            <h5 className="text-sm">Fuel Type</h5>
            <select
            onChange={(e)=> setInputs({...inputs, fuelType: e.target.value})}
            value={inputs.fuelType}
            className="w-36 px-3 py-2.5 ring-1 ring-slate-900/10 rounded-xl bg-primary mt-1.5 outline-none focus:ring-2 focus:ring-solid/40 focus:bg-white transition">
              <option>Select Type</option>
              {fuelTypes.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Features */}
        <div>
          <h5 className="text-sm">Features</h5>
          <div className="flex gap-2 flex-wrap mt-2">
            {Object.keys(inputs.features).map((feature, index) => (
              <label key={index} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ring-1 cursor-pointer transition ${inputs.features[feature] ? "bg-solid/10 ring-solid/40 text-solid" : "bg-primary ring-slate-900/10"}`}>
                <input
                  className="accent-solid"
                  onChange={(e)=> setInputs({...inputs, features: {...inputs.features, [feature]: !inputs.features[feature]}})}
                  value={inputs.features}
                  type="checkbox"
                  checked={inputs.features[feature]}
                />
                {feature}
              </label>
            ))}
          </div>
        </div>
        {/* Images */}
        <div className="flex gap-3 mt-2 flex-wrap">
          {Object.keys(images).map((key) => (
            <label
              key={key}
              htmlFor={`carImages${key}`}
              className="border-2 border-dashed border-slate-900/15 hover:border-solid/50 overflow-hidden rounded-xl cursor-pointer transition"
            >
              <input
                onChange={(e) =>
                  setImages({ ...images, [key]: e.target.files[0] })
                }
                type="file"
                accept="image/*"
                id={`carImages${key}`}
                hidden
              />
              <div className="h-20 w-28 bg-primary flexCenter">
                <img
                  src={
                    images[key]
                      ? URL.createObjectURL(images[key])
                      : assets.uploadIcon
                  }
                  alt="uploadArea"
                  className={`overflow-hidden ${images[key] ? "h-full w-full object-cover" : "w-10 opacity-60"}`}
                />
              </div>
            </label>
          ))}
        </div>
        <button type="submit" disabled={loading} className="btn-solid mt-3 max-w-40 disabled:opacity-60">
          {loading ? "Adding..." : "Add Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
