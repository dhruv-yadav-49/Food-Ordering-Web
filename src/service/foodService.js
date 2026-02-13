const Restaurant = require("../models/restaurant.model.js");
const Food = require("../models/food.model.js");


module.exports = {
        async createFood(req, restaurant){
        try{
            const food = new Food({
                name:req.name,
                description:req.description,
                price:req.price,
                image:req.image,
                foodCategory:req.category,
                restaurant:restaurant._id,
                creationDate: new Date(),
                isSeasonal: req.seasonal,
                isVegetarian: req.vegetarian,
                ingredients: req.ingredients,
            });
            await food.save();
            restaurant.foods.push(food._id);
            await restaurant.save();
            return food;
        }
        catch(error){
            throw new Error(`Failed to create food: ${error.message}`);
        }
    },

    async findFoodById(id){
        try{
            const food = await Food.findById(id).populate("restaurant");
            if(!food) throw new Error("Food not found");
            return food;
        }
        catch(error){
            throw new Error(error.message);
        }
    },

    async deleteFood(foodId){
        try{
            const food = await Food.findById(foodId);
            if(!food){
               throw new Error("Food not found");
            }
            await Food.findByIdAndDelete(foodId);
        }
        catch(error){
            throw new Error(
                `Failed to delete food with ID ${foodId}: ${error.message}`
            );
        }
    },

    async getRestaurantsFood(restaurantId, seasonal, nonveg, foodCategory, vegetarian){
        try{
            let query = { restaurant: restaurantId};
            if(vegetarian == "true") query.isVegetarian = true;
            if(nonveg == "true") query.isVegetarian = false;
            if(seasonal == "true") query.isSeasonal = true;
            if(foodCategory) query.foodCategory = foodCategory;

            const foods = await Food.find(query).populate([
                {path: "ingredients", populate: { path: "category", select: "name"}},
                "foodCategory",
                { path: "restaurant", select: "name _id"},
            ]);
            return foods;
            }
            catch(error){
                throw new Error(`Failed to retrieve restaurants food: ${error.message}`);
            }
    },
    
    async searchFood(keyword){
        try{
            let query = {};
            if(keyword){
                query.$or = [
                    { name: { $regex: keyword, $options: "i"}},
                    { description: { $regex: keyword, $options: "i"}},
                ];
            }
            const foods = await Food.find(query);
            return foods;
        }
        catch(error){
            throw new Error(`Failed to search for food: ${error.message}`);
        }
    },

    async  updateAvailibiltyStatus(foodId){
        try{
            const food = await Food.findById(foodId).populate([
                { path: "ingredients", populate: { path: "category", select: "name"}},
                "foodCategory",
                { path: "restaurant", select: "name _id"},
            ]);
            if(!food){
                throw new Error(`Food not found with ID ${foodId}`)
            }
            food.available = !food.available;
            await food.save();
            return food;
        }
        catch(error){
            throw new Error(`Failed to update food availability status for food with ID ${foodId}: ${error.message}`);
        }
    },


}