const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = () =>{
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    console.log("Connected"));
};

module.exports = connectDB;
