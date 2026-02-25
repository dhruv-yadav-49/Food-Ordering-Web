const Events = require("../models/event.model.js");
const Restaurant = require("../models/restaurant.model.js");

module.exports = {
    async createEvent(event, restaurantId){
        try{
            const restaurant = await Restaurant.findById(restaurantId);
            if(!restaurant){
                throw new Error(`Restaurant not found with ID ${restaurantId}`);
            }
            const createdEvent = new Events({
                name: event.name,
                startTime: event.startTime,
                endsAt: event.endsAt,
                location: event.location,
                restaurant: restaurantId,
                image: event.image,

            });
            await createdEvent.save();
            return createdEvent;
        }
        catch(error){
            throw new Error(`Failed to create event: ${error.message}`);
        }
    },

    async findAllEvent(){
        try{
            const events = await Events.find();
            return events;
        }
        catch(error){
            throw new Error(`Failed to find all events: ${error.message}`);
        }
    },
    async findById(id){
        try{
            const event = await Events.findById(id);
            if(!event){
                throw new Error(`Event not found with ID ${id}`);
            }
            return event;
        }
        catch(error){
            throw new Error(`Failed to find event with ID ${id}: ${error.message}`);
        }
    },

    async findEventsByRestaurantId(restaurantId){
        try{
            const events = await Events.find({
                restaurant: restaurantId,
            });
            return events;
        }
        catch(error){
            throw new Error(`Failed to find events for restaurant with ID ${restaurantId}: ${error.message}`);
        }
    },

    async updateEvent(id, event){
        try{
            const event = await Events.findById(id);
            if(!event){
                throw new Error(`Event not found with ID ${id}`);
            }
            event.name = event.name;
            event.description = event.description;
            event.startTime = event.startTime;
            event.endTime = event.endTime;
            await event.save();
            return event;
        }
        catch(error){
            throw new Error(`Failed to update event with ID ${id}: ${error.message}`);
        }
    },

    async deleteEvent(id){
        try{
            const event = await Events.findById(id);
            if(!event){
                throw new Error(`Event not found with ID ${id}`);
            }
            await event.remove();
            return event;
        }
        catch(error){
            throw new Error(`Failed to delete event with ID ${id}: ${error.message}`);
        }
    },
}