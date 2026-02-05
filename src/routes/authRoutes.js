const express=require("express");
const router=express.Router();
const authController=require("../controllers/authController.js");

router.post("/signup", authController.register);
router.post("/login", authController.login);



module.exports=router;