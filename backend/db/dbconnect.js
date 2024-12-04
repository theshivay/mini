const mongoose = require('mongoose');
const config = require("../config");

const connectDB = async () => {
    try {
        const responseFromDB = await mongoose.connect(`${config.mongoURI}`);
        console.log(`DB Connected Succesfully:`, responseFromDB.connection.host);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;