import React, {useEffect, useState} from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


const ListCar = () => {
    const {axios, getToken, user, currency} = useAppContext()
    const [cars, setCars] = useState([])

    // GET CARS OF THE AGENCY OWNER
    const getCars = async ()=>{
       try {
        const {data} = await axios.get('/api/cars/owner', {headers: {Authorization: `Bearer ${await getToken()}`}})

        if(data.success){
          setCars(data.cars)
        }else{
          toast.error(data.message)
        }
        
      } catch (error) {
         toast.error(error.message)
        
       }
    }


    // TOGGLE AVAILABILITY OF THE cAR
    const toggleAvailability = async (carId)=>{
       try {
        const {data} = await axios.post('/api/cars/toggle-availability', {carId}, {headers: {Authorization: `Bearer ${await getToken()}`}})

        if(data.success){
          toast.success(data.message)
          getCars()
        }else{
          toast.error(data.message)
        }
        
      } catch (error) {
         toast.error(error.message)
        
       }
    }


    useEffect(()=>{
        if(user){
            getCars()
        }
    }, [user])

  return (
    <div className='px-3 md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 card'>
      <div className="mb-6">
        <span className="eyebrow">Inventory</span>
        <h3 className="mt-1">Your Cars</h3>
        <p className="mt-1">{cars.length} car{cars.length === 1 ? "" : "s"} listed. Toggle availability anytime.</p>
      </div>
      {/* All Cars */}
      <div className="rounded-2xl ring-1 ring-slate-900/5 overflow-hidden">
        <div className="hidden sm:grid grid-cols-[2fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] px-6 py-3 bg-primary text-xs font-bold uppercase tracking-wide text-gray-50">
          <span className="hidden lg:block">#</span>
          <span>Name</span>
          <span>Address</span>
          <span>Price</span>
          <span>Available</span>
        </div>
        {cars.length === 0 && (
          <p className="px-6 py-10 text-center">No cars yet. Add your first car from the Add Car page.</p>
        )}
        {cars.map((car, index) => (
          <div
            key={car._id}
            className="flex justify-between items-center flex-wrap gap-2 sm:grid grid-cols-[2fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] px-6 py-3 bg-white hover:bg-primary/60 transition text-textColor text-sm font-semibold border-t border-slate-900/5"
          >
            <div className="hidden lg:block text-gray-50">{index + 1}</div>
            <div className="flexStart gap-x-3 max-w-64">
              <div className="bg-primaryOne rounded-lg p-1">
                <img src={car.images[0]} alt={car.title} className="w-16 h-10 object-contain" />
              </div>
              <div>
                <div className="line-clamp-1">{car.title}</div>
                <div className="text-xs text-gray-50 font-medium">{car.bodyType} · {car.city}</div>
              </div>
            </div>
            <div className="text-gray-50 line-clamp-2">{car.address}</div>
            <div>
              <div>{currency}{Number(car.price.sale).toLocaleString('en-IN')}</div>
              <div className="text-xs text-solid">{currency}{Number(car.price.rent).toLocaleString('en-IN')}/day</div>
            </div>
            <div>
              <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                  <input
                  onChange={()=>toggleAvailability(car._id)}
                  type="checkbox" className='sr-only peer' defaultChecked={car.isAvailable} />
                  <div className='w-10 h-6 bg-slate-300 rounded-full peer peer-checked:bg-solid transition-colors duration-200' />
                  <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-4' />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListCar