const { default: mongoose } = require("mongoose");

const mongodbUrl = "mongodb+srv://codewithDhruv:codewithDhruvYadav@cluster3.dhhaxsn.mongodb.net/?appName=Cluster3";


async function connectDb() {
    return mongoose.connect(mongodbUrl);
}

module.exports = connectDb;

