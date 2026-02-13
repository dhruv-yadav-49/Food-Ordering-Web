const cartService = require("../service/cartsService.js");
const userService = require("../service/userService.js");

module.exports = {
    addItemToCart: async (req,res) => {
        try{
            const user=req.user;
            const cart = await cartService.addItemToCart(req.body, user._id);
            res.status(200).json(cart);
        }
        catch (error) {
            if( error instanceof Error){
                res.status(400).json({error: error.message});
            }
            else{
                res.status(500).json({ error: "Internal server error"});
            }
        }
    },

    updateCartItemQuantity: async (req, res) =>{
        try {
            const { cartItemId,quantity} = req.body;
            const cart = await cartService.updateCartItemQuantity(cartItemId,quantity);
            res.status(200).json(cart);
        }
        catch( error){
            if( error instanceof Error){
                res.status(400).json({ error: error.message});
            }
            else{
                res.status(500).json({ error: "Internal server error"});
            }
        }
    },

    removeItemFromCart: async (req,res) =>{
        try{
            const { id } = req.params;
            const user= req.user;
            const cart = await cartService.removeItemFromCart(id, user);
            res.status(200).json(cart);
        }
        catch(error){
            if(error instanceof Error) {
                res.status(400).json({error: error.message});
            }
            else{
                res.status(500).json({ error: "Internal server error"});
            }
        }
    },

    findUserCart: async (req,res) =>{
        try{
            const user = req.user;
            const cart = await cartService.findCartByUserId(user._id.toString());
            res.status(200).json(cart);
        }
        catch(error){
            if(error instanceof Error) {
                res.status(400).json({error: error.message});
            }
            else{
                res.status(500).json({ error: "Internal server error"});
            }
        }
    },
    clearCart: async (req,res) =>{
        try{
            const user = req.user;
            const cart = await cartService.clearCart(user);
            res.status(200).json(cart);
        }
        catch(error){
            if(error instanceof Error) {
                res.status(400).json({error: error.message});
            }
            else{
                res.status(500).json({ error: "Internal server error"});
            }
        }
    },
}