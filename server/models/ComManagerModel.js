import mongoose from "mongoose";

const ComManagerSchema = new mongoose.Schema(
    {
        ManagerFirstName: {
            type: String,
            required: true,
           
        },
        ManagerLastName: {
            type: String,
            required: true,
            
        },
        ManagerAddLine1: {
            type: String,
            required: true,
           
        },
        ManagerAddLine2: {
            type: String,
            required: true,
            
        },
        ManagerDistrict: {
            type: String,
            required: true,

        },
        ManagerEmail: {
            type: String,
            required: true,


        },
        ManagerPhone: {
            type: Number,
            required: true,

        },
        ManagerNic: {
            type: String,
            required: true,

        },
        }
    
);

const ComManager = mongoose.model("ComManager", ComManagerSchema);

export default ComManager;
