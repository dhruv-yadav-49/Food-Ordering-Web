const mongoose = require("mongoose");

const IngredientCategorySchema=new mongoose.Schema({
    name: String,
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
    },
    ingredientItems:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"IngredientsItem",
        }
    ]
})

const IngredientCategory=mongoose.model("IngredientCategory", IngredientCategorySchema);
module.exports=IngredientCategory;