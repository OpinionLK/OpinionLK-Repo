import mongoose from "mongoose";

export const OrganizationDetailsSchema = new mongoose.Schema(
  {
    orgName: {
        type: String,
        required: true,
        trim: true,
    },
    orgAddress: {
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
  },
  {
    timestamps: true,
    collection: 'Organization' // Specify your collection name here
  }
);

export const ClientDetailsSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
    collection: 'clientDetails' // Specify your collection name here
  }
);

const ClientAuthSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
    collection: 'ClientAuth' // Specify your collection name here
  }
);

export default mongoose.models.ClientAuth || mongoose.model("ClientAuth", ClientAuthSchema);

const OrganizationDetails = mongoose.model("Organization", OrganizationDetailsSchema);
const ClientDetails = mongoose.model("ClientDetails", ClientDetailsSchema);
const ClientAuth = mongoose.model("ClientAuth", ClientAuthSchema);

export { OrganizationDetails, ClientDetails, ClientAuth };
