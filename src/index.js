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

module.exports = {app};