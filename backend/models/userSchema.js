const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken');
const keysecret='abcdefghigklmnopqrstuvwxyzabcdef';

const userScehma = new mongoose.Schema({
    username:{
        type: String,
        required:[true,"Please provide a username"],
    },
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"please provide a valid email",
        ],
    },
    password:{
        type: String,
        required:[true, "Please add a password"],
        minLength:6,
        select:false,
    },
    firstname:{
        type:String,
        required:[true,"please provide name"]
    },
    lastname:{
        type:String,
        required:[true,"please provide last name"]
    },
    address:{
        type:String,
        required:[true,"please provide address"]
    },
    role:{
        type:String,
        required:[true,"please provide role"]
    },
    tokens:[
        {
            token: {
                    type:String,
                    required:true
                    }
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpire:Date,
});



//hashing

userScehma.pre("save",async function(next){

    if(this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password,12);
    
    }

    
    next();
})

//token generate
userScehma.methods.generateAuthtoken = async function(){

    try{

        let token_gen = jwt.sign({_id:this._id},keysecret,{expiresIn:"1d"});

        this.tokens = this.tokens.concat({token:token_gen});

        await this.save();
        return token_gen;
    }catch(err){
        res.status(422).json(error);
    }
}

//Creating Model
const UserDB = new mongoose.model("users",userScehma);


module.exports = UserDB;