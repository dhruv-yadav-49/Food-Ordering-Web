const mongoose = require("mongoose");

const AddressSchema=mongoose.Schema({
    fullName:String,
    streetAddress:String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
});

const Address=mongoose.model("Address", AddressSchema);
module.exports=Address;