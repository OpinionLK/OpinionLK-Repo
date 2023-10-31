import mongoose from "mongoose";

const PlatformDataSchema = new mongoose.Schema({
    surveyPlans: {
        type: [mongoose.Schema.Types.Mixed],
        required: true,
    },
    pointsPerQuestion: {
        type: Number,
        required: true,
    },




})

const PlatformData = mongoose.model("PlatformData", PlatformDataSchema);
export default PlatformData;    