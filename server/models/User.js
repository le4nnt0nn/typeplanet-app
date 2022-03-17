const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true
    },
    following: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
        },
    ],
    followers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
        },
    ],
    level: {
        type: Number,
        default: 0
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;