const mongoose = require('mongoose');
const db = "mongodb://127.0.0.1:27017/project"

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to Mongo database');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;