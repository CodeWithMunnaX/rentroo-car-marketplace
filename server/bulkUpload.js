import mongoose from "mongoose";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import Car from "./models/Car.js";
import Agency from "./models/Agency.js";
import User from "./models/User.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLDN_NAME,
  api_key: process.env.CLDN_API_KEY,
  api_secret: process.env.CLDN_API_SECRET,
});


const dummyCars = [
  {
    title: "Jeep Compass Limited",
    description: "Rugged mid-size SUV with a refined cabin, confident highway manners and genuine off-road ability. Ideal for family road trips and weekend getaways.",
    address: "12 Connaught Place, New Delhi",
    city: "Delhi",
    country: "India",
    bodyType: "SUV",
    price: { rent: 3499, sale: 1850000 },
    specs: { transmission: "Automatic", seats: 5, fuelType: "Diesel" },
    odometer: 32000,
    features: ["Rear Camera", "Apple CarPlay", "Keyless Entry", "Sunroof", "Cruise Control", "Dual-zone AC"],
    images: ["car-jeep-compass.webp", "jeep-front.webp", "mg-parking.webp", "yard-row.webp"],
    isAvailable: true,
  },
  {
    title: "Mahindra Marazzo M8",
    description: "Spacious eight-seater with a smooth ride, roof-mounted AC vents and a big boot. Built for large families and airport runs.",
    address: "45 Linking Road, Bandra West, Mumbai",
    city: "Mumbai",
    country: "India",
    bodyType: "MUV",
    price: { rent: 2799, sale: 1150000 },
    specs: { transmission: "Manual", seats: 8, fuelType: "Diesel" },
    odometer: 41000,
    features: ["Rear Camera", "Android Auto", "Roof AC Vents", "Parking Assist", "Cruise Control", "Keyless Entry"],
    images: ["car-mahindra-marazzo.webp", "showroom-floor.webp", "yard-row.webp", "yard-patna.webp"],
    isAvailable: true,
  },
  {
    title: "Hyundai i20 Asta",
    description: "Premium hatchback that is easy to park, light to drive and frugal in traffic. A great pick for daily city commutes.",
    address: "88 MG Road, Bengaluru",
    city: "Bengaluru",
    country: "India",
    bodyType: "Hatchback",
    price: { rent: 1699, sale: 620000 },
    specs: { transmission: "Manual", seats: 5, fuelType: "Petrol" },
    odometer: 28500,
    features: ["Apple CarPlay", "Keyless Entry", "Rear Camera", "Automatic Climate", "Parking Assist", "Projector Lamps"],
    images: ["car-hyundai-i20.webp", "showroom-floor.webp", "yard-patna.webp", "yard-row.webp"],
    isAvailable: true,
  },
  {
    title: "Skoda Slavia Style",
    description: "Sharp-looking sedan with a punchy turbo petrol engine, ventilated seats and a roomy rear bench for long-distance comfort.",
    address: "21 Koregaon Park, Pune",
    city: "Pune",
    country: "India",
    bodyType: "Sedan",
    price: { rent: 2499, sale: 1390000 },
    specs: { transmission: "Automatic", seats: 5, fuelType: "Petrol" },
    odometer: 18000,
    features: ["Sunroof", "Ventilated Seats", "Apple CarPlay", "Rear Camera", "Cruise Control", "Wireless Charging"],
    images: ["car-skoda-slavia.webp", "showroom-floor.webp", "mg-parking.webp", "yard-row.webp"],
    isAvailable: true,
  },
  {
    title: "Tata Altroz XZ+",
    description: "5-star safety rated premium hatch with a solid build, flat floor and generous cabin space for its size.",
    address: "7 Boring Road, Patna",
    city: "Patna",
    country: "India",
    bodyType: "Hatchback",
    price: { rent: 1499, sale: 690000 },
    specs: { transmission: "Manual", seats: 5, fuelType: "Petrol" },
    odometer: 22000,
    features: ["Rear Camera", "Apple CarPlay", "Keyless Entry", "Automatic Climate", "Cruise Control", "Ambient Lighting"],
    images: ["car-tata-altroz.webp", "yard-patna.webp", "yard-row.webp", "showroom-floor.webp"],
    isAvailable: true,
  },
  {
    title: "Kia Seltos HTX",
    description: "Feature-loaded compact SUV with a plush ride, panoramic screens and plenty of tech for both city and highway.",
    address: "3 Jubilee Hills, Hyderabad",
    city: "Hyderabad",
    country: "India",
    bodyType: "SUV",
    price: { rent: 2999, sale: 1450000 },
    specs: { transmission: "Automatic", seats: 5, fuelType: "Petrol" },
    odometer: 26000,
    features: ["Sunroof", "360 Camera", "Ventilated Seats", "Apple CarPlay", "Cruise Control", "Bose Audio"],
    images: ["car-kia-seltos.webp", "mg-hector.webp", "mg-parking.webp", "yard-row.webp"],
    isAvailable: true,
  },
  {
    title: "Mahindra KUV100 NXT",
    description: "Compact crossover with a high seating position and flexible six-seat layout. Budget friendly and easy to drive.",
    address: "14 MI Road, Jaipur",
    city: "Jaipur",
    country: "India",
    bodyType: "SUV",
    price: { rent: 1399, sale: 480000 },
    specs: { transmission: "Manual", seats: 6, fuelType: "Petrol" },
    odometer: 54000,
    features: ["Rear Camera", "Keyless Entry", "Bluetooth Audio", "Parking Assist", "Dual Airbags", "Power Windows"],
    images: ["car-mahindra-kuv100.webp", "yard-patna.webp", "showroom-floor.webp", "yard-row.webp"],
    isAvailable: true,
  },
  {
    title: "Tata Tiago XZ",
    description: "Reliable small car with excellent fuel economy, a punchy audio system and low running costs. Perfect for first-time renters.",
    address: "56 Anna Salai, Chennai",
    city: "Chennai",
    country: "India",
    bodyType: "Hatchback",
    price: { rent: 1199, sale: 450000 },
    specs: { transmission: "Manual", seats: 5, fuelType: "Petrol" },
    odometer: 31000,
    features: ["Rear Camera", "Android Auto", "Keyless Entry", "Harman Audio", "Dual Airbags", "Parking Assist"],
    images: ["car-tata-tiago.webp", "tiago-turntable.webp", "car-tata-tiago-grey.webp", "yard-row.webp"],
    isAvailable: true,
  },
  {
    title: "Maruti Ertiga ZXi",
    description: "India's favourite family MPV with seven seats, a smooth engine and great running economy on CNG.",
    address: "9 Rajouri Garden, New Delhi",
    city: "Delhi",
    country: "India",
    bodyType: "MUV",
    price: { rent: 2299, sale: 980000 },
    specs: { transmission: "Manual", seats: 7, fuelType: "CNG" },
    odometer: 38000,
    features: ["Rear Camera", "Apple CarPlay", "Roof AC Vents", "Cruise Control", "Keyless Entry", "Parking Assist"],
    images: ["car-maruti-ertiga.webp", "showroom-floor.webp", "yard-row.webp", "yard-patna.webp"],
    isAvailable: true,
  },
  {
    title: "Ford EcoSport Titanium",
    description: "Sturdy compact SUV with tight handling, high ground clearance and a well-equipped cabin for monsoon roads.",
    address: "33 Hiranandani Gardens, Powai, Mumbai",
    city: "Mumbai",
    country: "India",
    bodyType: "SUV",
    price: { rent: 1999, sale: 790000 },
    specs: { transmission: "Automatic", seats: 5, fuelType: "Petrol" },
    odometer: 47000,
    features: ["Sunroof", "Apple CarPlay", "Rear Camera", "Cruise Control", "Keyless Entry", "Automatic Climate"],
    images: ["car-ford-ecosport.webp", "mg-parking.webp", "yard-row.webp", "showroom-floor.webp"],
    isAvailable: true,
  },
  {
    title: "Hyundai Grand i10 Sportz",
    description: "Easy-going city hatchback with light controls, a smooth engine and a comfortable cabin. Cheapest way to get around town.",
    address: "17 Indiranagar 100ft Road, Bengaluru",
    city: "Bengaluru",
    country: "India",
    bodyType: "Hatchback",
    price: { rent: 1099, sale: 410000 },
    specs: { transmission: "Manual", seats: 5, fuelType: "Petrol" },
    odometer: 58000,
    features: ["Rear Camera", "Bluetooth Audio", "Keyless Entry", "Dual Airbags", "Power Windows", "Parking Assist"],
    images: ["car-hyundai-grand-i10.webp", "showroom-floor.webp", "yard-patna.webp", "yard-row.webp"],
    isAvailable: true,
  },
  {
    title: "Audi A7 Sportback",
    description: "Elegant four-door coupe with a silky V6, quattro all-wheel drive and a cabin full of luxury tech. Made for special occasions.",
    address: "2 Marine Drive, Mumbai",
    city: "Mumbai",
    country: "India",
    bodyType: "Sedan",
    price: { rent: 8999, sale: 8500000 },
    specs: { transmission: "Automatic", seats: 4, fuelType: "Petrol" },
    odometer: 12000,
    features: ["Matrix LED", "Massage Seats", "Bang & Olufsen", "Adaptive Cruise", "360 Camera", "Air Suspension"],
    images: ["car-audi-a7.webp", "mg-parking.webp", "showroom-floor.webp", "yard-row.webp"],
    isAvailable: true,
  },
];


async function bulkUpload() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, { dbName: "Rentroo" });

    // 1. Get logged-in agent (owner) from DB
    //    (replace this with actual owner ID if known, or query by email)
    // Falls back to a demo owner + agency so a fresh database can be seeded
    let owner = await User.findOne({ role: "agencyOwner" });
    if (!owner) {
      owner = await User.create({
        _id: "user_rentroo_demo_owner",
        username: "Rentroo Motors",
        email: "demo@rentroo.com",
        image: "https://ui-avatars.com/api/?name=Rentroo+Motors&background=2563eb&color=fff",
        role: "agencyOwner",
      });
      console.log("Created demo agency owner");
    }

    // 2. Get agency owned by this user
    let agency = await Agency.findOne({ owner: owner._id });
    if (!agency) {
      agency = await Agency.create({
        name: "Rentroo Motors",
        address: "Suite 405, Cyber Hub, DLF Phase 2, Gurugram",
        contact: "+91 98765 43210",
        email: "demo@rentroo.com",
        owner: owner._id,
        city: "Delhi",
      });
      console.log("Created demo agency");
    }

    console.log(`Using Agency: ${agency.name} | Owner: ${owner.username}`);

    // Upload each image once and reuse its URL across cars (shared gallery photos)
    const uploaded = {};
    const uploadImage = (fileName) => {
      if (!uploaded[fileName]) {
        const filePath = path.join(__dirname, "images", fileName);
        uploaded[fileName] = cloudinary.uploader
          .upload(filePath, {
            folder: "rentroo/cars",
            public_id: path.parse(fileName).name,
            overwrite: true,
          })
          .then((result) => result.secure_url);
      }
      return uploaded[fileName];
    };

    for (const car of dummyCars) {
      // Skip cars that were already seeded, so the script can be re-run safely
      if (await Car.exists({ agency: agency._id, title: car.title })) {
        console.log(`Skipped (already exists): ${car.title}`);
        continue;
      }

      // Upload images to Cloudinary
      const imagesUrl = await Promise.all(car.images.map(uploadImage));

      // Create car with real agency reference
      await Car.create({
        agency: agency._id,
        title: car.title,
        description: car.description,
        city: car.city,
        country: car.country,
        address: car.address,
        odometer: Number(car.odometer) || 0,
        bodyType: car.bodyType,
        price: {
          rent: car.price?.rent ? Number(car.price.rent) : null,
          sale: car.price?.sale ? Number(car.price.sale) : null,
        },
        specs: {
          transmission: car.specs?.transmission || "Unknown",
          seats: Number(car.specs?.seats || 1),
          fuelType: car.specs?.fuelType || "Unknown",
        },
        features: Array.isArray(car.features) ? car.features : [],
        images: imagesUrl,
        isAvailable: !!car.isAvailable,
      });

      console.log(`Uploaded: ${car.title}`);
    }

    console.log("All cars uploaded successfully!");
  } catch (err) {
    console.error("Error:", err.message || err);
  } finally {
    await mongoose.disconnect();
  }
}

bulkUpload();

