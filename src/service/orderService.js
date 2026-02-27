const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItem = require("../models/orderItem.model.js");
const Restaurant = require("../models/restaurant.model.js");

module.exports = {
    async createOrder(order, user) {
        try {
            const address = order.deliveryAddress;
            let savedAddress;
            if (address._id) {
                const isAddressExist = await Address.findById(address._id);
                if (isAddressExist) {
                    savedAddress = isAddressExist;
                } else {
                    // Fallback if ID provided but not found? Or just treat as error? 
                    // Assuming if ID is passed it should exist. 
                    // If logic allows saving a new address if ID not found, we can do that,
                    // but safer to Create new if no ID.
                     throw new Error('Address not found');
                }
            } else {
                const shippingAddress = new Address(order.deliveryAddress);
                savedAddress = await shippingAddress.save();
                // Add to user addresses if not already present
                if (!user.addresses.includes(savedAddress._id)) {
                    user.addresses.push(savedAddress._id);
                    await user.save();
                }
            }

            const restaurant = await Restaurant.findById(order.restaurantId);
            if (!restaurant) {
                throw new Error(`Restaurant not found with ID ${order.restaurantId}`);
            }

            const cart = await cartService.findCartByUserId(user._id);

            if (!cart) {
                throw new Error("cart not found");
            }

            const orderItems = [];

            for (const cartItem of cart.items) {
                const orderItem = new OrderItem({
                    food: cartItem.food,
                    ingredients: cartItem.ingredients,
                    quantity: cartItem.quantity,
                    totalPrice: cartItem.food.price * cartItem.quantity,
                });
                const savedOrderItem = await orderItem.save();
                orderItems.push(savedOrderItem._id);
            }
            const totalPrice = await cartService.calculateCartTotals(cart);

            const createdOrder = new Order({
                customer: user._id,
                restaurant: restaurant._id,
                items: orderItems,
                deliveryAddress: savedAddress._id,
                createdAt: new Date(),
                orderStatus: "PENDING",
                totalAmount: totalPrice,
            });

            const savedOrder = await createdOrder.save();

            restaurant.orders.push(savedOrder._id);
            await restaurant.save();

            // const paymentResponse = await paymentService.generatePaymentLink(savedOrder);
            // console.log(paymentResponse);
            // return paymentResponse;
            return savedOrder;
        } catch (error) {
            console.error("Error creating order:", error);
            throw new Error(error.message);
        }
    },

    async cancelOrder(orderId){
        try{
            await  Order.findByIdAndDelete(orderId);
        }catch (error){
            throw new Error(`Failed to cancel order with ID ${orderId}: ${error.message}`);
        }
    },

    async findOrderById(orderId){
        try{
            const order = await Order.findById(orderId);
            if(!order){
                throw new Error(`Order not found with ID ${orderId}`)
            }
            return order;
        }
        catch(error){
            throw new Error(`Failed to find order with ID ${orderId}: ${error.message}`);
        }
    },

    async getUserOrders(userId){
        try{
            const orders = await Order.find({customer: userId});
            return orders;
        }
        catch(error){
            throw new Error(`Failed to get user orders:${error.message}`);
        }
    },

    async getOrdersOfRestaurant(restaurantId){
        try{
            let orders = await Order.find({restaurant: restaurantId});
            if(orderStatus){
                orders = orders.filter((order) => order.orderStatus == orderStatus);
            }
            return orders;
        }
        catch(error){
            throw new Error(`Failed to get orders of restaurant with ID ${restaurantId}: ${error.message}`);
        }
    },

    async updateOrder(orderId, status){
        try{
            const validStatuses = ["OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED", "PENDING"];
            if(!validStatuses.includes(orderStatus)){
                throw new Error("Please select a valid order status");
            }

            const order = await Order.findById(orderId);
            if(!order){
                throw new Error(`Order not found with ID ${orderId}`);
            }
            order.orderStatus = orderStatus;
            await order.save();

            return order;
        }
        catch(error){
            throw new Error(`Failed to update order with ID ${orderId}: ${error.message}`);
        }
    },
}