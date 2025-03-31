import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
        
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F792070653234421442%2F&psig=AOvVaw0B8PNqpHCmfevV1vTZT0ew&ust=1741518391579000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJihzNyr-osDFQAAAAAdAAAAABAE"
    },
    branch:{
        type: String,
        required: true
    },
    rollNo:{
        type: String,
        required: true,
        unique: true
    },
    phoneNo:{
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String, 
        enum: ["Male", "Female"], 
        required: true
    },
    otp:{
        type: String,
    },
    otpExpiry:{
        type: Date
    },
    isVerified: { type: Boolean, default: false },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;