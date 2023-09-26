import mongoose from 'mongoose'

const UserTagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    color: String,
});

const UserTag = mongoose.model('Tag', UserTagSchema);

module.exports = UserTag;
