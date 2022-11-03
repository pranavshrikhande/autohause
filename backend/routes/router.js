const express = require('express');
const bcrypt = require("bcryptjs");

const router = new express.Router();
const UserDB = require('../models/userSchema');
const EmployeeDB = require('../models/employeeSchema');

const authenticate = require("../middleware/authenticate");


//csv
const { Parser } = require("json2csv");

const fs = require("fs");
const { response } = require('express');
const { request } = require('http');

//for user registration

router.post("/register",async(req,res)=>{

    console.log(req.body);
    const {firstname,lastname,email,password,cpassword,username,address,role} = req.body;

    if(! firstname|| !lastname|| !email || !password || !cpassword ||!username || !address|| !role)
    {
        res.status(422).json({error:"Fill all the details"});
    }

    try{

        const preuser = await UserDB.findOne({email:email});

        if(preuser)
        {
            res.status(422).json({error:"This email already exist"});
        }else if(password !== cpassword)
        {
            res.status(422).json({error:"Password and Confirm password not match"});
        }
        else{
            const finalUser = new UserDB({
                firstname, lastname,email, password,username,address,role
            });

            const storeData = await finalUser.save();

            //console.log(storeData);

            res.status(201).json({status:201,storeData});



        }




    }catch(error){
        console.log(error);
        res.status(422).json({error});

    }
})


router.post("/login", async(req,res)=>{
console.log(req.body);

const {email,password} = req.body;

if(!email || !password)
{
    res.status(422).json({error :"Fill all the details"});
}

try{
    const userValid = await UserDB.findOne({email:email}).select("+password");
    console.log(userValid);
    
    if(userValid)
    {
        const isMatch = await bcrypt.compare(password,userValid.password);
        
        if(!isMatch)
        {
            res.status(422).json({error:"invalid details"});
        }else{

            //generate Token
            const token = await userValid.generateAuthtoken();

            console.log(token);
            res.cookie("usercookie",token,{
                expires:new Date(Date.now()+900000),
                httpOnly:true
            });

            const result ={
                userValid,
                token,

            }
            res.status(201).json({status:201,result});

        }
    }

}catch(error){
    console.log(error);
    res.status(401).json(error);
}

})


//user valid

router.get("/validuser",authenticate,async(req,res)=>{

    //call middleware function to pass token
    

    try{
        const ValidUserOne = await UserDB.findOne({_id:req.userId});

        res.status(201).json({status:201,ValidUserOne});

    }catch(error){
        res.status(401).json({status:401,error});
    }


})


//user logout

router.get("/logout",authenticate,async(req,res)=>{
    try{
        req.rootUser.tokens =   req.rootUser.tokens.filter((currelem)=>{return currelem.token !== req.token});

        res.clearCookie("usercookie",{path:"/"});
        
        req.rootUser.save();

        res.status(201).json({status:201})

    }catch(error){
        res.status(401).json({status:201,error:req.rootUser.tokens})

    }
})

//create Employee

router.post("/createEmployee",async(req,res)=>{
    

    const {email,firstname,lastname,address,role,username,createdBy}=req.body;

    try{

        const preEmployee = await EmployeeDB.findOne({email:email});

        

        if(preEmployee)
        {
            res.status(422).json({error:"This email already exist"});
        }
        else{
            const finalEmployee = new EmployeeDB({
                email,firstname,username,lastname,address,role,createdBy
            });
            
            const storeEmpData = await finalEmployee.save();
            
            res.status(201).json({status:201,storeEmpData});
        }

    }catch(error){
        console.log(error);
        res.status(422).json({error});
    }
})

//get data from employee

router.get("/getempdata",async(req,res)=>{

    try{
        const resp = await EmployeeDB.find({});

        res.status(201).json({status:201,resp});
    }catch(err)
    {
        req.status(422).json({error});
    }

})

router.get("/downloadcsv",async(req,res)=>{
    try{

        const resp = await EmployeeDB.find({});


        //console.log(resp);

        const jsonCsvParser = new Parser();
        
        const csv = await jsonCsvParser.parse(resp)

        console.log(csv)

        await fs.writeFile("information.csv",csv,function(err){
            if(err)
            {
            throw err;
               }
               
               console.log('File Saved');
        
            })

            res.attachement("information.csv");

            res.status(200).send(csv);

        //res.status(201).json({status:201,resp});


    }catch(error){
        res.status(422).json({error});
    }
})


//get single user based on id

router.get("/getemp/:email", async(req,res)=>{

   
    let email_id = req.params.email
    
    
    try{

        const emp = await EmployeeDB.findOne({email:email_id})

       console.log(emp);

        res.status(200).json(emp);

    }catch(error)
    {
        res.status(404).json({message:error.message});
    }

})

//add values to edit 
router.post("/editempl/:email", async (req,res)=>{

    //let user = req.body;
    //console.log(user);
    console.log(req.params.email);
    let updateEmail = req.params.email;
    

    

    let emp = req.body;
    console.log(emp);
    const editUser = new  EmployeeDB(emp);
    console.log('edit user now is->',editUser)

    try{
       //await EmployeeDB.updateOne({email:updateEmail},editUser);
       const empdata = await EmployeeDB.findOne({email:updateEmail})

       let identifier = empdata._id.toString();

       console.log('identifieer is', identifier);

       let result =  await EmployeeDB.findByIdAndUpdate({_id:identifier},{
        $set:{editUser}
       });
       
       console.log('result is', result);
      
       res.status(201).json({status:201,editUser});

    }catch(error)
    {
        console.log('inside error',error.message);
        res.status(409).json({message:error.message});
    }
})


//DELETE EMP
router.delete("/deleteempl/:email",async(req,res)=>{

    let deleteEmail = req.params.email;
    console.log(deleteEmail);
    try{
            await EmployeeDB.deleteOne({email:deleteEmail});

     }
    catch(err)
    {
        console.log(err);
        res.status(409).json({message: err.message});
    }

})


module.exports = router;