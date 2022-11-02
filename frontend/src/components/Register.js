import React, { useState } from 'react'
import './mix.css';
import { NavLink } from 'react-router-dom';

const Register = () => {

    const [passShow,setPassShow] = useState(false);

    const [cpassShow,setCPassShow] = useState(false);

    const [inpval, setInpval]= useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        cpassword:"",
        username:"",
        address:"",
        role:""
    })


    console.log(inpval);

    const setVal = (e)=>{
        console.log(e.target.value);

        const {name,value} = e.target;

        setInpval(()=>{
            return {
                ...inpval,
                [name]:value
            }
        })
    };

    const addUserData= async (e)=>{
        e.preventDefault();

        const { firstname, lastname,email, password, cpassword,username,address,role} = inpval;

        if(firstname=== "")
        {
            alert("Please enter your name");
        }
        else if(lastname=== "")
        {
            alert("Please enter your last name");
        }
        else if(email=== ""){
            alert("Please enter your email");
        }else if(!email.includes("@")){
            alert("Enter valid email");
        }
        else if(password==="")
        {
            alert("Enter your password");
        }
        else if(password.length < 6){
            alert("Password must be atleast 6 characters");
        }
        else if(password !== cpassword)
        {
            alert("password and confirm password are not match");
        }
        else if(role ==="")
        {
            alert("Please select your role");
        }
        else{
           // console.log("User registration successfully done");

           const data = await fetch("http://localhost:5005/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                firstname, lastname,email, password, cpassword,username,address,role
            })

           });

           const res = await data.json();

           console.log(res);
           
           if(res.status==201)
           {
            alert("user registration completed");
            setInpval({...inpval,
            firstname:"",
            lastname:"",
            email:"",
            password:"",
            cpassword:"",
            username:"",
            address:"",
            role:""})
           }
           
        }
    };

  return (
   <>
    <section>
    <div className="form_data">
        <div className="form_heading">
            <h1>Register</h1>
            <p>Please enter your details</p>
        </div>

        <form>

        <div className="form_input">
                <label htmlFor="firstname">Name</label>
                <input type="text" onChange={setVal} value={inpval.firstname} name="firstname" id="firstname" placeholder="Enter your name"/>

            </div>

            <div className="form_input">
                <label htmlFor="lastname">Last Name</label>
                <input type="text"  onChange={setVal} value={inpval.lastname} name="lastname" id="lastname" placeholder="Enter your last name"/>

            </div>


            <div className="form_input">
                <label htmlFor="email">Email</label>
                <input type="email"  onChange={setVal} value={inpval.email} name="email" id="email" placeholder="Enter your email address"/>

            </div>

            
            <div className="form_input">
                <label htmlFor="username">Username</label>
                <input type="text"  onChange={setVal} value={inpval.username} name="username" id="username" placeholder="Enter your username"/>

            </div>

            <div className="form_input">
                <label htmlFor="address">Address</label>
                <input type="text"  onChange={setVal} value={inpval.address} name="address" id="address" placeholder="Enter your address"/>

            </div>

           

            <div className="form_input">
                <label htmlFor="password">Password</label>
                <div className="two">
                <input type={!passShow ? "password" : "text"}  onChange={setVal} value={inpval.password} name="password" id="password" placeholder="Enter your password"/>
                <div className='showpass' onClick={()=> setPassShow(!passShow)}>
                {!passShow ? "Show" : "Hide"}
                
                </div>
                </div>                
                
            </div>

            <div className="form_input">
                <label htmlFor="password">Confirm Password</label>
                <div className="two">
                <input type={!cpassShow ? "password" : "text"}  onChange={setVal} value={inpval.cpassword} name="cpassword" id="cpassword" placeholder="Confirm password"/>
                <div className='showpass' onClick={()=> setCPassShow(!cpassShow)}>
                {!cpassShow ? "Show" : "Hide"}
                
                </div>
                </div>                
                
            </div>
            <br></br>
            <div className="form_input">
                <label htmlFor="role">Role</label>
                <select name="role"  onChange={setVal} value={inpval.role}id="role">
                    <option value="-">Select Below</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
               

            </div>

            <br></br>

            <button className='btn' onClick={addUserData}>Signup</button>
            <p>Already have an Account? <NavLink to="/">Login</NavLink></p>
        </form>



    </div>

    </section>
    
   </>
  )
}

export default Register