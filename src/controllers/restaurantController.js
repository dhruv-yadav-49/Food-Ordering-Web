const restaurantService = require("../service/RestaurantService.js");
const { createRestaurant } = require("../service/RestaurantService.js");

module.exports={

    createRestaurant:async(req,res)=>{
        try{
            const user=req.user;
            const restaurant=await restaurantService.createRestaurant(req.body,user);
            res.status(201).json(restaurant);
        }

        catch(error){
            res.status(400).send({error:error.message})

        }
    },

    deleteRestaurantById:async(req, res)=>{
        try{
            const { id } =req.params;
            await restaurantService.deleteRestaurant(id);
            res.status(200).json({message:"Restaurant deleted successfully",success:true})
        }
        catch(error){
            if(error instanceof Error){
            res.status(400).json({error:error.message })
            }
            else{
                res.status(500).json({error:"Internal server error"});
            }
        }
    },

    updateRestaurantStatus:async(req,res)=>{
        try{
            const {id}=req.params;
            console.log("restaurant id", id);
            const restaurant = await restaurantService.updateRestaurantStatus(id.toString()
        );
        console.log("restaurant id", id);
        res.status(200).json(restaurant);
        }
        catch(error){
            if(error instanceof Error){
                res.status(400).json({error:error.message})
            }
            else{
                res.status(500).json({error:"Internal server error"})
            }
        }
    },

    findRestaurantByUserId:async(req, res)=>{
        try {
            const user = req.user;
            const restaurant = await restaurantService.getRestaurantByUserId(user._id);
            res.status(200).json(restaurant);
        }
        catch(error){
            if(error instanceof Error){
                res.status(400).json({error:error.message});
            }
            else{
                res.status(500).json({error:"Internal server error"});
            }
        }
    },

    findRestaurantByName:async(req,res)=>{
        try{
            const {keyword}=req.query;
            const restaurant=await restaurantService.searchRestaurants(keyword);
            res.status(200).json(restaurant);
        }
        catch(error){
            res.status(500).json({error:"Internal server error"});
        }
    },

    getAllRestaurants:async(req,res)=>{
        try{
            const restaurants = await restaurantService.getAllRestaurants();
            res.status(200).json(restaurants);
        }
        catch(error){
            res.status(500).json({error:error.message});
        }
    },

    findRestaurantById:async(req,res)=>{
        try{
            const {id} = req.params;
            const restaurant = await restaurantService.findRestaurantById(id);
            res.status(200).json(restaurant);
        }
        catch(error){
            if(error instanceof Error){
                res.status(400).json({error:error.message})
            }
            else{
                res.status(500).json({error: "Internal server error"})
            }
        }
    },

    addToFavorite:async(req,res)=>{
        try{
            const { id } = req.params;
            const user = req.user;
            const restaurant = await restaurantService.addToFavorites(id,user);
            res.status(200).json(restaurant);
        }
        catch(error){
            if(error instanceof Error){
                res.status(400).json({error:error.message})
            }
            else{
                res.status(500).json({error:"Internal server error"})
            }
        }
    },
}