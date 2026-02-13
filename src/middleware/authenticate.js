const { getUserIdFromToken } = require("../config/jwtProvider");
const userService = require("../service/userService");

const authenticate=async(req,res,next)=>{

    try{
        const token=req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message:"No token provided"
            })
        }

        const userId=getUserIdFromToken(token);
        const user=await userService.findUserById(userId);

        req.user=user;
    }catch (error){
        return res.status(500).json({error:error.message})
    }
    next();
}

module.exports=authenticate;