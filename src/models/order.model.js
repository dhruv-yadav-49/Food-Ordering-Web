const mongoose = require("mongoose");

const OrderSchema=mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
    },
    items:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"OrderItem",
        }
    ],
    orderStatus:String,
    totalAmount:Number,
    totalItem:Number,
    createdAt:{
        type:Date,
        default:Date.now,
    },
    deliveryAddress:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Address",
    },
    payment:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Payment",
    },
    totalItem:Number,
    totalPrice: Number,
})

const Order=mongoose.model("Order", OrderSchema);
module.exports=Order;