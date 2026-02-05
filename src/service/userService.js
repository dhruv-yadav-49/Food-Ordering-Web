const User = require("../models/user.model");

module.exports ={
    async createUser(userData){
        
        try{
            let {fulllName,emailValue,password,role}=userData;
            const isUserExist = await User.findOne({email:emailValue});

            if(isUserExist){
                throw new Error("User aleady exists with email");
            }

            password=await bcrypt.hash(password,8);
            const user = await User.create({
                fullName,
                email:emailValue,
                password,
                role
            })

            return user;
        }catch(error){
            throw new Error(error.message);
        }
    }
}