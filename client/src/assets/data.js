import logoImg from "./logo.png";
import search from './search.svg'
import user from './user.svg'
import menu from './menu.svg'
import close from './close.svg'
import right from './right.svg'
import pin from './pin.svg'
import calendar from './calendar.svg'
import star from './star.svg'
import sliders from './sliders.svg'
import car from './car.svg'
import carBlack from './car-black.svg'
import carPlus from './car-plus.svg'
import transmission from './transmission.svg'
import seats from './seats.svg'
import fuelType from './fuel-type.svg'
import odometer from './odometer.svg'
import facebook from './facebook.svg'
import instagram from './instagram.svg'
import twitter from './twitter.svg'
import linkedin from './linkedin.svg'
import mail from './mail.svg'
import phone from './phone.svg'
import house from './house.svg'
import dollar from './dollar.svg'
import pound from './pound.svg'
import map from './map.svg'
import list from './list.svg'
import dashboard from './dashboard.svg'
import userImg from './user.png'
import user1 from './user1.png'
import user2 from './user2.png'
import user3 from './user3.png'
import uploadIcon from "./upload_icon.png"
// Hero & section images
import heroCar from "./media/hero-sedan.webp"
import teamDesk from "./media/team-desk.webp"
import discover from "./media/discover.webp"
import yardWide from "./media/yard-wide.webp"
import findYourDrive from "./media/find-your-drive.webp"
import storefront from "./media/storefront.webp"
// Car cut-outs
import audiA7 from "./media/car-audi-a7.webp"
import jeepCompass from "./media/car-jeep-compass.webp"
import marazzo from "./media/car-mahindra-marazzo.webp"
import i20 from "./media/car-hyundai-i20.webp"
import slavia from "./media/car-skoda-slavia.webp"
import altroz from "./media/car-tata-altroz.webp"
import seltos from "./media/car-kia-seltos.webp"
import kuv100 from "./media/car-mahindra-kuv100.webp"
import tiago from "./media/car-tata-tiago.webp"
import tiagoGrey from "./media/car-tata-tiago-grey.webp"
import ertiga from "./media/car-maruti-ertiga.webp"
import ecosport from "./media/car-ford-ecosport.webp"
import grandI10 from "./media/car-hyundai-grand-i10.webp"
// Showroom & yard photos (gallery + blogs)
import tiagoTurntable from "./media/tiago-turntable.webp"
import mgHector from "./media/mg-hector.webp"
import jeepFront from "./media/jeep-front.webp"
import mgParking from "./media/mg-parking.webp"
import showroomFloor from "./media/showroom-floor.webp"
import yardRow from "./media/yard-row.webp"
import yardPatna from "./media/yard-patna.webp"
import lounge from "./media/lounge.webp"


export const assets = {
    logoImg,
    search,
    user,
    menu,
    close,
    heroCar,
    right,
    pin,
    calendar,
    star,
    sliders,
    odometer,
    transmission,
    seats,
    fuelType,
    car,
    carBlack,
    carPlus,
    facebook,
    instagram,
    twitter,
    linkedin,
    mail,
    phone,
    dollar,
    house,
    pound,
    map,
    dashboard,
    list,
    userImg,
    user1,
    user2,
    user3,
    about1: teamDesk,
    about2: discover,
    banner: yardWide,
    bannerCar: jeepCompass,
    agencyReg: findYourDrive,
    contact: storefront,
    uploadIcon
}

export const cities = [
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Pune",
    "Hyderabad",
    "Chennai",
    "Jaipur",
    "Patna",
];


export const dummyAgentData = {
    "_id": "agent_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Izabella Stress",
    "image": userImg,
    "role": "agencyOwner",
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": cities.slice(0, 3),
  }


  // Agency Dummy Data
  export const dummyAgencyData = {
    "_id": "67f7642a197ac559e4089b99",
    "name": "Aurora Motors",
    "contact": "0123456789",
    "email": "contact@auroramotors.com",
    "address": "Suite 405, Cyber Hub, DLF Phase 2",
    "owner": dummyAgentData,
    "city": "Delhi",
    "createdAt": "2025-04-12T10:45:30.000Z",
    "updatedAt": "2025-04-12T10:45:30.000Z",
    "__v": 0
}


const makeCar = (_id, title, bodyType, city, address, price, specs, odometer, features, images, description) => ({
    _id,
    agency: dummyAgencyData,
    title,
    description,
    address,
    city,
    country: "India",
    bodyType,
    price,
    specs,
    odometer,
    features,
    images,
    isAvailable: true,
    status: "available",
    createdAt: "2025-04-10T06:26:04.013Z",
    updatedAt: "2025-04-10T06:26:04.013Z",
    __v: 0
})

// Cars Listings Dummy Data
export const dummyCars = [
    makeCar("67f7647c197ac559e4089b96", "Jeep Compass Limited", "SUV", "Delhi", "12 Connaught Place, New Delhi",
        { rent: 3499, sale: 1850000 }, { transmission: "Automatic", seats: 5, fuelType: "Diesel" }, 32000,
        ["Rear Camera", "Apple CarPlay", "Keyless Entry", "Sunroof", "Cruise Control", "Dual-zone AC"],
        [jeepCompass, jeepFront, mgParking, yardRow],
        "Rugged mid-size SUV with a refined cabin, confident highway manners and genuine off-road ability. Ideal for family road trips and weekend getaways."),
    makeCar("67f76452197ac559e4089b8e", "Mahindra Marazzo M8", "MUV", "Mumbai", "45 Linking Road, Bandra West, Mumbai",
        { rent: 2799, sale: 1150000 }, { transmission: "Manual", seats: 8, fuelType: "Diesel" }, 41000,
        ["Rear Camera", "Android Auto", "Roof AC Vents", "Parking Assist", "Cruise Control", "Keyless Entry"],
        [marazzo, showroomFloor, yardRow, yardPatna],
        "Spacious eight-seater with a smooth ride, roof-mounted AC vents and a big boot. Built for large families and airport runs."),
    makeCar("67f76406197ac559e4089b82", "Hyundai i20 Asta", "Hatchback", "Bengaluru", "88 MG Road, Bengaluru",
        { rent: 1699, sale: 620000 }, { transmission: "Manual", seats: 5, fuelType: "Petrol" }, 28500,
        ["Apple CarPlay", "Keyless Entry", "Rear Camera", "Automatic Climate", "Parking Assist", "Projector Lamps"],
        [i20, showroomFloor, yardPatna, yardRow],
        "Premium hatchback that is easy to park, light to drive and frugal in traffic. A great pick for daily city commutes."),
    makeCar("67f763d8197ac559e4089b7a", "Skoda Slavia Style", "Sedan", "Pune", "21 Koregaon Park, Pune",
        { rent: 2499, sale: 1390000 }, { transmission: "Automatic", seats: 5, fuelType: "Petrol" }, 18000,
        ["Sunroof", "Ventilated Seats", "Apple CarPlay", "Rear Camera", "Cruise Control", "Wireless Charging"],
        [slavia, showroomFloor, mgParking, yardRow],
        "Sharp-looking sedan with a punchy turbo petrol engine, ventilated seats and a roomy rear bench for long-distance comfort."),
    makeCar("67f7663b197ac559e4089bb8", "Tata Altroz XZ+", "Hatchback", "Patna", "7 Boring Road, Patna",
        { rent: 1499, sale: 690000 }, { transmission: "Manual", seats: 5, fuelType: "Petrol" }, 22000,
        ["Rear Camera", "Apple CarPlay", "Keyless Entry", "Automatic Climate", "Cruise Control", "Ambient Lighting"],
        [altroz, yardPatna, yardRow, showroomFloor],
        "5-star safety rated premium hatch with a solid build, flat floor and generous cabin space for its size."),
    makeCar("67f765aa197ac559e4089b9c", "Kia Seltos HTX", "SUV", "Hyderabad", "3 Jubilee Hills, Hyderabad",
        { rent: 2999, sale: 1450000 }, { transmission: "Automatic", seats: 5, fuelType: "Petrol" }, 26000,
        ["Sunroof", "360 Camera", "Ventilated Seats", "Apple CarPlay", "Cruise Control", "Bose Audio"],
        [seltos, mgHector, mgParking, yardRow],
        "Feature-loaded compact SUV with a plush ride, panoramic screens and plenty of tech for both city and highway."),
    makeCar("67f765f4197ac559e4089ba4", "Mahindra KUV100 NXT", "SUV", "Jaipur", "14 MI Road, Jaipur",
        { rent: 1399, sale: 480000 }, { transmission: "Manual", seats: 6, fuelType: "Petrol" }, 54000,
        ["Rear Camera", "Keyless Entry", "Bluetooth Audio", "Parking Assist", "Dual Airbags", "Power Windows"],
        [kuv100, yardPatna, showroomFloor, yardRow],
        "Compact crossover with a high seating position and flexible six-seat layout. Budget friendly and easy to drive."),
    makeCar("67f7660a197ac559e4089bb0", "Tata Tiago XZ", "Hatchback", "Chennai", "56 Anna Salai, Chennai",
        { rent: 1199, sale: 450000 }, { transmission: "Manual", seats: 5, fuelType: "Petrol" }, 31000,
        ["Rear Camera", "Android Auto", "Keyless Entry", "Harman Audio", "Dual Airbags", "Parking Assist"],
        [tiago, tiagoTurntable, tiagoGrey, yardRow],
        "Reliable small car with excellent fuel economy, a punchy audio system and low running costs. Perfect for first-time renters."),
    makeCar("67f7666c197ac559e4089bc0", "Maruti Ertiga ZXi", "MUV", "Delhi", "9 Rajouri Garden, New Delhi",
        { rent: 2299, sale: 980000 }, { transmission: "Manual", seats: 7, fuelType: "CNG" }, 38000,
        ["Rear Camera", "Apple CarPlay", "Roof AC Vents", "Cruise Control", "Keyless Entry", "Parking Assist"],
        [ertiga, showroomFloor, yardRow, yardPatna],
        "India's favourite family MPV with seven seats, a smooth engine and great running economy on CNG."),
    makeCar("67f7669d197ac559e4089bc8", "Ford EcoSport Titanium", "SUV", "Mumbai", "33 Hiranandani Gardens, Powai, Mumbai",
        { rent: 1999, sale: 790000 }, { transmission: "Automatic", seats: 5, fuelType: "Petrol" }, 47000,
        ["Sunroof", "Apple CarPlay", "Rear Camera", "Cruise Control", "Keyless Entry", "Automatic Climate"],
        [ecosport, mgParking, yardRow, showroomFloor],
        "Sturdy compact SUV with tight handling, high ground clearance and a well-equipped cabin for monsoon roads."),
    makeCar("67f766cf197ac559e4089bd0", "Hyundai Grand i10 Sportz", "Hatchback", "Bengaluru", "17 Indiranagar 100ft Road, Bengaluru",
        { rent: 1099, sale: 410000 }, { transmission: "Manual", seats: 5, fuelType: "Petrol" }, 58000,
        ["Rear Camera", "Bluetooth Audio", "Keyless Entry", "Dual Airbags", "Power Windows", "Parking Assist"],
        [grandI10, showroomFloor, yardPatna, yardRow],
        "Easy-going city hatchback with light controls, a smooth engine and a comfortable cabin. Cheapest way to get around town."),
    makeCar("67f766cf197ac559e4089bd8", "Audi A7 Sportback", "Sedan", "Mumbai", "2 Marine Drive, Mumbai",
        { rent: 8999, sale: 8500000 }, { transmission: "Automatic", seats: 4, fuelType: "Petrol" }, 12000,
        ["Matrix LED", "Massage Seats", "Bang & Olufsen", "Adaptive Cruise", "360 Camera", "Air Suspension"],
        [audiA7, mgParking, showroomFloor, yardRow],
        "Elegant four-door coupe with a silky V6, quattro all-wheel drive and a cabin full of luxury tech. Made for special occasions."),
];



// User Bookings Dummy Data
export const dummyBookingsData = [
    {
        "_id": "67f76839994a731e97d3b8ce",
        "user": dummyAgentData,
        "car": dummyCars[1],
        "agency": dummyAgencyData,
        "pickUpDate": "2025-04-30T00:00:00.000Z",
        "dropOffDate": "2025-05-01T00:00:00.000Z",
        "totalPrice": 2799,
        "status": "pending",
        "paymentMethod": "Razorpay",
        "isPaid": false,
        "createdAt": "2025-04-10T06:42:01.529Z",
        "updatedAt": "2025-04-10T06:43:54.520Z",
        "__v": 0
    },
    {
        "_id": "67f76829994a731e97d3b8c3",
        "user": dummyAgentData,
        "car": dummyCars[0],
        "agency": dummyAgencyData,
        "pickUpDate": "2025-04-27T00:00:00.000Z",
        "dropOffDate": "2025-04-28T00:00:00.000Z",
        "totalPrice": 3499,
        "status": "pending",
        "paymentMethod": "Pay at Pick-up",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:45.873Z",
        "updatedAt": "2025-04-10T06:41:45.873Z",
        "__v": 0
    },
    {
        "_id": "67f76810994a731e97d3b8b4",
        "user": dummyAgentData,
        "car": dummyCars[3],
        "agency": dummyAgencyData,
        "pickUpDate": "2025-04-11T00:00:00.000Z",
        "dropOffDate": "2025-04-12T00:00:00.000Z",
        "totalPrice": 2499,
        "status": "pending",
        "paymentMethod": "Pay at Pick-up",
        "isPaid": true,
        "createdAt": "2025-04-10T06:41:20.501Z",
        "updatedAt": "2025-04-10T06:41:20.501Z",
        "__v": 0
    }
]


// Blogs Dummy Data with Descriptions
export const blogs = [
  {
    title: "Top 8 Indian Cities to Rent a Car in 2025",
    category: "Travel Trends",
    image: yardPatna,
    description: "Find out the best cities where renting a car is affordable, convenient, and offers the best travel experience in 2025."
  },
  {
    title: "How to Choose the Right Rental Car",
    category: "Rental Guide",
    image: showroomFloor,
    description: "A step-by-step guide to selecting the perfect rental car based on budget, trip type, and personal preferences."
  },
  {
    title: "SUV vs Hatchback: Which One to Rent?",
    category: "Car Comparisons",
    image: mgHector,
    description: "Explore the benefits of renting an SUV versus a hatchback and decide which suits your journey best."
  },
  {
    title: "First-Time Car Rental Tips You Must Know",
    category: "Beginner Tips",
    image: lounge,
    description: "Essential tips for first-time renters to avoid hidden fees, choose the right insurance, and get the best deals."
  },
  {
    title: "Maximizing Savings on Long-Term Car Rentals",
    category: "Money Saving",
    image: yardRow,
    description: "Discover smart strategies to save money and get the best value when renting cars for longer durations."
  },
  {
    title: "What to Check Before You Drive Off",
    category: "Inspection Guide",
    image: jeepFront,
    description: "A quick walk-around checklist covering tyres, lights, fuel and documents so your trip starts without surprises."
  },
  {
    title: "How to Book a Rental Car for Road Trips",
    category: "Road Trip Guide",
    image: mgParking,
    description: "Learn how to plan and book the right rental car to make your road trips safe, comfortable, and enjoyable."
  },
  {
    title: "2025 Car Rental Industry Trends",
    category: "Market Trends",
    image: storefront,
    description: "An expert overview of the latest car rental market trends, from electric vehicles to flexible rental models."
  },
];



// Dashboard Dummy Data
export const dummyDashboardData = {
    "totalBookings": 3,
    "totalRevenue": 8797,
    "bookings": dummyBookingsData
}
