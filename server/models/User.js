import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
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
    }, {
        timestamps: true,
        collection: 'User' // Specify your collection name here
    }
);

const User = mongoose.model("User", UserSchema);

export default User;
