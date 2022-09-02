const mongoose = require('mongoose');
const { exit } = require('process');

const connectDB = async() => {
    try {
        console.log(process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error);
        exit(1);
    }
}


module.exports = connectDB;