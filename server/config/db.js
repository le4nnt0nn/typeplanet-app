const mongoose = require('mongoose');
const CONFIG = require('./config');

const connectDB = async () => {
    try {
        await mongoose.connect(CONFIG.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("Database connected!");
    } catch (err) {
        console.error("Failed to connect: " + err.message);
        // if fails, then exit
        process.exit(1);
    }
};

module.exports = connectDB;