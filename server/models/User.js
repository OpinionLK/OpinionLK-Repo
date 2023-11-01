import { Int32 } from "mongodb";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 3,
            max: 20
        },
        lastName: {
            type: String,
            required: true,
            min: 3,
            max: 20
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 20
        },
        gender: {
            type: String,
            required: false,
            min: 6,
            max: 20
        },
        city: {
            type: String,
            required: false,
            min: 6,
            max: 20
        },
        birthyear: {
            type: Number,
            required: false,
            default: 0
        },
        profilePicture: {
            type: String,
            default: ""
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        points: {
            type: Number,
            default: 0
        },
        coupons: {
            type: Array,
            default: []
        },
    }, {
        timestamps: true,
        collection: 'User' // Specify your collection name here
    }
);

const User = mongoose.model("User", UserSchema);

export default User;
