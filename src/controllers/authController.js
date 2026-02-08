const { generateToken } = require("../config/jwtProvider");
const userService = require("../service/userService");
const bcrypt = require("bcrypt");

const register=async(req,res)=>{
    try{
        const user=await userService.createUser(req.body);
        const jwt=generateToken(user._id);

        return res.status(201).json({
            jwt,message:"register successfully"
        })
    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}

const login=async(req,res)=>{
    const {password,email}=req.body;
    try{
        const user=await userService.getUserByEmail(email);

        const isPasswordMatched=await bcrypt.compare(password,user.password);
        if(!isPasswordMatched){
            return res.status(401).json({
                message:"Invalid credentials"
            });
        }
        const jwt=generateToken(user._id);
        return res.status(200).json({
            jwt,message:"login successfully",user
        })
    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}

module.exports={register, login}