const Restaurant = require("../models/restaurant.model.js");
const Address = require("../models/address.model.js");

module.exports={

    async createRestaurant(req,user){
        try {
            const address=new Address({
                city:req.address.city,
                country:req.address.country,
                fullName:req.address.fullName,
                state:req.address.state,
                streetAddress:req.address.streetAddress,
                postalCode:req.address.postalCode,
            })

            const savedAddress=await address.save();

            const restaurant=new Restaurant({
                address:savedAddress,
                contactInformation:req.contactInformation,
                cuisineType:req.cuisineType,
                description:req.description,
                images:req.images,
                name:req.name,
                openingHours:req.openingHours,
                registrationDate:req.registrationDate,
                owner:user
            })

            const savedRestaurant=await restaurant.save();
            return savedRestaurant;
        }
        catch (error){
            throw new Error(error.message);
        }

    },

    async findRestaurantById(restaurantId){
        try{
            const restaurant=await Restaurant.findById(restaurantId);
            if(!restaurant) throw new Error("Restaurant not found");
            return restaurant;
        }catch (error){
            throw new Error(error.message);
        }
    },

    async deleteRestaurant(restaurantId){
        try{
            await this.findRestaurantById(restaurantId);
            await Restaurant.findByIdAndDelete(restaurantId);
        }
        catch(error){
            throw new Error(error.message);
        }
    },

    async getAllRestaurants(){
        try{
            const restaurants=await Restaurant.find();
            return restaurants;
        }
        catch (error){
            throw new Error(error.message);
        }
    },

    async getRestaurantByUserId(userId){
        try{
            const restaurant=await Restaurant.findOne({owner:userId}).populate('owner').populate("address");

            if(!restaurant) throw new Error("Restaurant not found");
            return restaurant;
        }
        catch (error){
            throw new Error(error.message);
        }
    },

    async searchRestaurants(keyword){
        try{
            const restaurants=await Restaurant.find({

                $or:[
                    {
                        name:{$regex:keyword,$options:'i'},
                        description:{$regex:keyword,$options:'i'},
                        cuisineType: {$regex: keyword, $options: "i"},
                    },
                ],
            });
            return restaurants;
        }
        catch (error){
            throw new Error(error.message);
        }
    },

    async addToFavorites(restaurantId,user){

        try{
            const restaurant = await this.findRestaurantById(restaurantId);

            const dto={
                _id:restaurant._id,
                title:restaurant.name,
                images:restaurant.images,
                description:restaurant.description
            }

            const favorites=user.favorites || [];
            const index=favorites.findIndex(favorite=>favorite._id.toString() === restaurantId.toString());

            if(index!==-1){
                favorites.splice(index,1);
            }
            else{
                favorites.push(dto);
            }

            user.favorites = favorites;
            await user.save();
            return dto;
        }
        catch(error){
            throw new Error(error.message);
        }
    },

    async updateRestaurantStatus(id){
        try{
            const restaurant = await Restaurant.findById(id).populate('owner').populate('address');

            if(!restaurant) throw new Error("restaurant not found");
            restaurant.open = !restaurant.open;
            await restaurant.save();
            return restaurant;
        }
        catch(error){
            throw new Error(error.message);
        }
    }
}