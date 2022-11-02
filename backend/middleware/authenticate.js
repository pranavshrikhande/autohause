const jwt = require("jsonwebtoken");
const UserDB = require("../models/userSchema");
const keysecret='abcdefghigklmnopqrstuvwxyzabcdef';


const authenticate = async(req,res,next)=>{

    try{
        const token = req.headers.authorization;
       
        const verifyToken = jwt.verify(token,keysecret);
       
        const rootUser = await UserDB.findOne({_id:verifyToken._id});

      if(!rootUser)
      {
        throw  new Error ("user not found");
       
      }
      req.token = token;
      req.rootUser = rootUser;

      req.userId = rootUser._id;

      next();

    }catch(err){
        res.status(401).json({status:401,message:"Unauthorized no token provided"});
    }



}

module.exports = authenticate;