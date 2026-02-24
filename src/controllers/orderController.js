const orderService = require("../service/orderService.js");
const userService = require("../services/userService.js");

module.exports = {
    createOrder: async (req,res) =>{
        try{
            const user = req.user;
            const order = req.body;
            if(!order){
                throw new Error('Please provide valid request body');
            }
            const paymentResponse = await orderService.createOrder(order, user);
            res.status(200).json(paymentResponse);
        }
        catch(error){
            if(error instanceof Error){
                res.status(400).json({error: error.message});
            }
            else{
                res.status(500).json({error: "Internal server error"});
            }
        }
    },

    getAllUserOrders: async (req,res) =>{
        try{
            user=req.user;
            
            const userOrders = await orderService.getUserOrders(user._id);
            res.status(200).json(userOrders);
        }catch (error){
            if (error instanceof Error){
                res.status(400).json({ error: error.message});
            }else{
                res.status(500).json({error: 'Internal server error'});
            }
        }
    },

    deleteOrder: async (req,res) =>{
        try{
            const { orderId } = req.params;
            await orderService.cancelOrder(orderId);
            res.status(200).json({message: `Order deleted with id ${orderId}`});
        }catch(error){
            if (error instanceof Error){
                res.status(400).json({error: error.message});
            }else{
                res.status(500).json({error: "Internal server error"});
            }
        }
    },

    getAllRestaurantOrders: async (req, res) =>{
        try{
            const { restaurantId } = req.params;
            const { order_status } = req.query;
            const orders = await orderService.getOrdersOfRestaurant(restaurantId,order_status);
            res.status(200).json(orders);
        }catch(error){
            if (error instanceof Error){
                res.status(400).json({error: error.message});
            }else{
                res.status(500).json({error: "Internal server error"});
            }
        }
    },

    updateOrder: async (req,res) =>{
        try {
            const { orderId, orderStatus } = req.params;
            const order = await orderService.updateOrder(orderId, orderStatus);
            res.status(200).json(order);
        }catch(error){
            if(error instanceof Error){
                res.status(400).json({ error: error.message});
            }else{
                res.status(500).json({ error: "internal server error"});
            }
        }
    }
}