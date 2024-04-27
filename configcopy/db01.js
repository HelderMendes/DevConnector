const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// mongoose.connect(db);

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongDB is Connected...');
    } catch (err) {
        console.error(err.message);
        //Exit process or whit a failure (escape from the process)
        process.exit(1);
    }
};

module.exports = connectDB;
