const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();

const homeRouter = require("./routes/homeRoutes")
app.use("/",homeRouter);

app.use(cors());
app.use(express.json());

const authRoutes=require("./routes/authRoutes.js");
const restaurantRoutes = require("./routes/restaurantRoutes.js");
const foodRoutes = require("./routes/foodRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");

app.use("/auth",authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/cart", cartRoutes);

const userRoutes=require("./routes/userRoutes.js");
app.use("/api/users",userRoutes);

const adminRestaurantRoutes=require("./routes/adminRestaurantRoutes.js");
app.use("/api/admin/restaurants",adminRestaurantRoutes);

const orderRoutes=require("./routes/orderRoutes.js");
app.use("/api/order",orderRoutes);

const cartItemRoutes = require('./routes/cartItemRoutes.js');
app.use("/api/cart-item",cartItemRoutes);

const categoryRoutes=require("../routes/categoryRoutes.js")
app.use("/api/category",categoryRoutes);

const adminCategoryRoutes=require("./routes/adminCategoryRoutes.js");
app.use("/api/admin/category",adminCategoryRoutes);

const adminOrderRoutes=require("./routes/adminOrderRoutes.js");
app.use("/api/admin/order",adminOrderRoutes);

const menuItemRoutes=require("./routes/menuItemRoutes.js");
app.use("/api/food",menuItemRoutes);

const adminIngredientsRouter=require('./routes/adminIngredientsRoutes.js');
app.use("/api/admin/ingredients",adminIngredientsRouter);

const eventRoutes=require("./routes/eventRoutes.js");
app.use("/api/events",eventRoutes);

const adminEventsRoutes=require("./routes/adminEventRoutes.js");
app.use("/api/admin/events",adminEventsRoutes);

module.exports = {app};