const Cart = require("../models/cart.model.js");
const CartItem = require("../models/cartItem.model.js");
const Food = require("../models/food.model.js");

module.exports = {
    async createCart(user){
        const cart = new Cart({ customer: user });
        const createdCart = await cart.save();
        return createdCart;
    },

    async findCartById(id){
        try{
            const cart = await Cart.findById(id).populate({
                path: "items",
                populate: {
                    path: "food",
                    populate: {
                        path: "restaurant",
                    }
                }
            });
            return cart;
        }
        catch(error){
            throw new Error(error.message);
        }
    },

    async findCartByUserId(userId){
            const cart = await Cart.findOne({ customer: userId }).populate([
               { 
                path: "items",
                populate: {
                    path: "food",
                    populate: {path: "restaurant", select: "_id"},
                }
              }
            ]);

            if (!cart){
                throw new Error("Cart not found for user - " + userId);
            }
            let cartItems = await CartItem.find({cart: cart._id}).populate("food");

            console.log("cartItems", cartItems);

            let totalPrice = 0;
            let totalDiscountedPrice = 0;
            let totalItem = 0;

            for (const item of cart.items){
                totalPrice += item.totalPrice;
                totalDiscountedPrice += item.totalPrice; // Assuming no discount logic for now
                totalItem += item.quantity;
            }

            cart.totalPrice = totalPrice;
            cart.totalItem = totalItem;
            cart.totalDiscountedPrice = totalDiscountedPrice;
            cart.discount = totalPrice - totalDiscountedPrice;

            return cart;
    },

    async addItemToCart(req, userId){
        const cart = await Cart.findOne({ customer: userId });
        const food = await Food.findById(req.menuItemId);

        const isPresent = await CartItem.findOne({
            cart: cart._id,
            food: food._id,
            userId,
        });

        if(!isPresent) {
            const cartItem = new CartItem({
                food: food._id,
                cart: cart._id,
                userId,
                totalPrice: food.price,
            });
            const createdCartItem = await cartItem.save();
            cart.items.push(createdCartItem);
            await cart.save();
            return createdCartItem;
        }
        return isPresent;
    },

    async updateCartItemQuantity(cartItemId, quantity) {
        const cartItem = await CartItem.findById(cartItemId).populate([
            { path: "food", populate: { path: "restaurant", select: "_id" }},
        ]);
        if(!cartItem){
            throw new Error(`Cart item not found with ID ${cartItemId}`);
        }

        cartItem.quantity = quantity;
        cartItem.totalPrice = quantity * cartItem.food.price;
        await cartItem.save();
        return cartItem;
    },

    async removeItemFromCart(cartItemId, user) {
        const cart = await Cart.findOne({ customer: user._id});

        if(!cart) {
            throw new Error("Cart not found for user ID ", user._id);
        }

        cart.items = cart.items.filter((item) => !item.equals(cartItemId));
        await cart.save();
        return cart;
    },

    async clearCart(userId){
        const cart = await Cart.findOne({ customer: userId });
        if(!cart){
            throw new Error(`Cart not found for user ID ${userId._id}`);
        }
        cart.items = [];
        await cart.save();
        return cart;
    },

    async calculateCartTotals(cart){
        try {
            let total = 0;

            for (let cartItem of cart.items){
                total += cartItem.food.price * cartItem.quantity;
            }
            return total;
        }
        catch(error){
            throw new Error(error.message);
        }
    },
};