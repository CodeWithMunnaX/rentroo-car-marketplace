import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        // dbName keeps working with Atlas URIs that include query params (?retryWrites=true...)
        await mongoose.connect(process.env.MONGO_URI, { dbName: "Rentroo" })
        console.log("✔ Database Connected")
    } catch (error) {
        console.log("❌ Database Connection Failed", error.message)

    }
}

export default connectDB
