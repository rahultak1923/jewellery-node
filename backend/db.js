const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/jewellery';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Failed to connect to Mongo", error);
    }
};

module.exports = connectToMongo;
