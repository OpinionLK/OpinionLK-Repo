import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
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
    }, {
        timestamps: true,
        collection: 'Admin' // Specify your collection name here
    }
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
