import mongoose from "mongoose";

const ComManagerSchema = new mongoose.Schema(
    {
        ManagerFirstName: {
            type: String,
           
        },
        ManagerLastName: {
            type: String,
            
        },
        ManagerAddLine1: {
            type: String,
           
        },
        ManagerAddLine2: {
            type: String,
            
        },
        ManagerDistrict: {
            type: String,

        },
        ManagerEmail: {
            type: String,


        },
        ManagerPhone: {
            type: Number,

        },
        ManagerNic: {
            type: String,

        },
        }
    
);

const ComManager = mongoose.model("ComManager", ComManagerSchema);

export default ComManager;
