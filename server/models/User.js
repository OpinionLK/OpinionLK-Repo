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
        city: {
            type: String,
            max: 50
        },
        town: {
            type: String,
            max: 50
        },
        postalCode: {
            type: String,
            max: 50
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
