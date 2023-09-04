import mongoose from "mongoose";

const ClientsSchema = new mongoose.Schema(
  {
    orgName: {
        type: String,
        required: true,
        trim: true,
    },
    orgAddressLine1: {
        type: String,
        required: true,
        trim: true,
    },
    orgAddressLine2: {
        type: String,
        required: true,
        trim: true,
    },
    orgCity: {
        type: String,
        required: true,
        trim: true,
    },
    orgState: {
        type: String,
        required: true,
        trim: true,
    },
    orgZip: {
        type: String,
        required: true,
        trim: true,
    },
    orgPhone: {
        type: String,
        required: true,
        trim: true,
    },
    orgEmail: {
        type: String,
        required: true,
        trim: true,
    },
    orgWebsite: {
        type: String,
        required: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    position: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    nic: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    confirmPassword: {
        type: String,
        required: false,
        trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'Clients' // Specify your collection name here
  }
);

export default mongoose.models.Clients || mongoose.model("Clients", ClientsSchema);

const Clients = mongoose.model("Clients", ClientsSchema);

export { Clients };
