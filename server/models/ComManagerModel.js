import mongoose from "mongoose";

const ComManagerSchema = new mongoose.Schema(
    {
        ManagerName: {
            type: String,
            required: true,
            min: 3,
            max: 30
        },
        ManagerEmail: {
            type: String,
            required: true,
            max: 20,
            unique: true
        },
        ManagerPhone: {
            type: Number,
            required: true,
            max: 10,
            unique: true
        },
        ManagerNic: {
            type: String,
            required: true,
            min: 6,
            max: 20
        },}
    
);

const ComManager = mongoose.model("ComManager", ComManagerSchema);

export default ComManager;
