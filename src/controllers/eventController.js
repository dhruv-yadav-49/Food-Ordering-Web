const eventService = require("../service/eventservice");

module.exports = {
    createEvents: async (req, res) => {
        try{
            const { event } = req.body;
            const { restaurantId } = req.params;
            const createdEvents = await eventService.createEvent(event, restaurantId);
            res.status(202).json(createdEvents);
        }
        catch (error){
            if (error instanceof Error){
                res.status(400).json({ error: error.message});
            }
            else{
                res.status(500).json({ error: "Internal server error"});
            }
        }
    },

    findAllEvents: async (req,res)=>{
        try{
            const events = await eventService.findAllEvent();
            return res.status(200).json(events);
        }
        catch (error){
            if (error instanceof Error){
                res.status(400).json({ error: error.message});
            }
            else{
                res.status(500).json({ error: "Internal server error"});
            }
        }
    },

    findRestaurantsEvents: async (req,res)=>{
        try{
            const { restaurantId } = req.params;
            const events = await eventService.findRestaurantsEvent(restaurantId);
            return res.status(200).json(events);
    }
    catch (error){
         if (error instanceof Error){
            res.status(400).json({ error: error.message});
        }
        else{
            res.status(500).json({ error: "Internal server error"});
        }
    }
},

    deleteEvents: async (req,res)=>{
        try{
            const {id} = req.params;
            await eventService.deleteEvent(id);
            res.status(200).json({message:"Event deleted successfully", success: true});
        }
        catch (error){
            res.status(500).json({ error: "Internal server error"});
        }
    },
}