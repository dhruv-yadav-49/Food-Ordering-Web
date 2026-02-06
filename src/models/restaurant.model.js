const mongoose = require("mongoose");
const { register } = require("../controllers/authController");

const RestaurantSchema=mongoose.Schema({
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    name:String,
    description:String,
    cuisineType:String,
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"address"
    },
    contactInformation:{},
    openingHours: String,
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Oder"
        }
    ],
    images:[String],
    numRating:Number,
    registrationDate:{
        type: Date,
        default: Date.now,
    },
    open: Boolean,
    foods:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food",
        }
    ],
})

const Restaurant=mongoose.model("Restaurant", RestaurantSchema);
module.exports=Restaurant;