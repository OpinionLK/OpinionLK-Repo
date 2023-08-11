import mongoose from "mongoose";

const ComManagerSchema = new mongoose.Schema(
    {
        ManagerName: {
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
            
        },}
    
);

const ComManager = mongoose.model("ComManager", ComManagerSchema);

export default ComManager;
