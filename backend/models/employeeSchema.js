const mongoose= require('mongoose');
const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken');

const employeeSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"please provide a valid email",
        ],
    },
    firstname:{
        type:String,
        required:[true,"please provide name"]
    },
    lastname:{
        type:String,
        required:[true,"please provide last name"]
    },
    username:{
        type:String,
        required:[true,"please provide username"]
    },
    address:{
        type:String,
        required:[true,"please provide address"]
    },
    role:{
        type:String,
        required:[true,"please provide role"]
    },
    createdBy:{
        type:String,
        required:[true,"please enter account created admin"]
    },

});

const EmployeeDB = new mongoose.model("employee",employeeSchema);

module.exports = EmployeeDB;