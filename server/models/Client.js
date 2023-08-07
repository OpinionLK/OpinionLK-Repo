import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            default: "company",
        },
        companyName: {
            type: String,
            required: false,
            min: 3,
            max: 20
        },
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
    collection: 'Client' // Specify your collection name here
}
);

const Client = mongoose.model("Client", ClientSchema);

export default Client;
