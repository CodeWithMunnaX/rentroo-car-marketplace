import { clerkClient } from "@clerk/express";
import User from "../models/User.js";

// Create the DB user from Clerk if the webhook hasn't synced it yet (e.g. local dev)
const syncUserFromClerk = async (userId) => {
    const clerkUser = await clerkClient.users.getUser(userId)
    const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ")
    const email = clerkUser.primaryEmailAddress?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress || ""
    return User.findOneAndUpdate(
        { _id: userId },
        { $setOnInsert: { _id: userId, email, username: name || clerkUser.username || email.split("@")[0] || "User", image: clerkUser.imageUrl } },
        { upsert: true, new: true }
    )
}

export const authUser = async (req, res, next)=>{
    try {
        const {userId} = req.auth()
        if(!userId){
            return res.json({success:false, message: "Not Authorized"})
        }
        
        let user = await User.findById(userId)
        if(!user){
            user = await syncUserFromClerk(userId)
        }
        
        req.user = user
        next()

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})    

    }
}
