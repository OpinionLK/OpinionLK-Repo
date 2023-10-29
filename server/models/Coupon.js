import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            min: 3,
            max: 20
        },
        title: {
            type: String,
            required: true,
            min: 5,
            max: 40
        },
        description: {
            type: String,
            required: false,
            min: 5,
            max: 100
        },
        sponsor: {
            type: String,
            required: true,
            min: 5,
            max: 40
        },
        points: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["bogof", "discount", "freebie", "other"],
            default: "other",
        },
        expiryDate: {
            type: Date,
            required: true,
        },
        active: {
            type: Boolean,
            default: true
        },
    }, {
        timestamps: true,
        collection: 'Coupon' // Specify your collection name here
    }
    );