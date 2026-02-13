const { default: mongoose } = require("mongoose");

const mongodbUrl = process.env.MONGO_URI;


async function connectDb() {
    return mongoose.connect(mongodbUrl);
}

module.exports = connectDb;

