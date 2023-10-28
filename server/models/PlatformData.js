import mongoose from "mongoose";

const PlatformDataSchema = new mongoose.Schema({
    surveyBaseCost: {
        type: Number,
        required: true,
        trim: true,
        default: 1000
    },
    surveyCostPerResponse: {
        type: Number,
        required: true,
        trim: true,
        default: 10
    },
    perDayCost: {
        type: Number,
        required: true,
        trim: true,
        default: 7
    },
    maxDuration: {
        type: Number,
        required: true,
        trim: true,
        default: 14
    },
    perQuestionCost: {
        type: Number,
        required: true,
        trim: true,
        default: 20
    }
     


})

const PlatformData = mongoose.model("PlatformData", PlatformDataSchema);
export default PlatformData;    