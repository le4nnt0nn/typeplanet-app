const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    description: {
        type: String,
        default: 'Hey, a new Dev is here!'
    },
    bio: {
        type: String,
        default: 'This is my bio and I really love Astro'
    },
    topics: {
        type: [String],
        required: true,
        default: ["REACT", "ANGULAR", "JS", "NODE", "JAVA", "C#"]
    },
    posts: {
        type: Number,
        default: 0
    },
    githubuser: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Profile = mongoose.model("profile", ProfileSchema);
module.exports = Profile;