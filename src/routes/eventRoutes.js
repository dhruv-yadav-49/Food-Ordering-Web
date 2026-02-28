const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController.js");

router.get("",eventController.findAllEvents);

module.exports = router;
