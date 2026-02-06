const mongoose = require("mongoose");

const FoodSchema=mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    foodCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    images:[String],
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
    },
    isVegetarian:Boolean,
    isSeasonal:Boolean,
    available:Boolean,
    ingredients:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'IngredientsItem',
        }
    ],
    creationDate:{
        type: Date,
        default: Date.now,
    }
})

const Food = mongoose.model("Food", FoodSchema);
module.exports=Food;