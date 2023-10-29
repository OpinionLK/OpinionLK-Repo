import mongoose from "mongoose";

const CouponsSchema = new mongoose.Schema({
    CouponImage: {
        type: String,
        required: false,
        trim: true,
    },
    CouponName: {
        type: String,
        required: true,
        trim: true,
    },
    CouponCode: {
        type: String,
        required: true,
        trim: true,
    },
    Description: {
        type: String,
        required: true,
        trim: true,
    },
    StartDate: {
        type: Date,
        required: true,
        trim: true,
    },
    EndDate: {
        type: Date,
        required: true,
        trim: true,
    },
    Status: {
        type: String,
        required: true,
        trim: true,
    },
    Count: {
        type: Number,
        required: true,
        trim: true,
    },
    Points: {
        type: String,
        required: true,
        trim: true,
    },
    CompanyName: {
        type: String,
        required: true,
        trim: true,
    },
});

const Coupons = mongoose.model("Coupons", CouponsSchema);
export default Coupons;