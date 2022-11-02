import React, { useState } from 'react'
import './mix.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {

const [passShow,setPassShow] = useState(false);

const [inpval, setInpval]= useState({
    email:"",
    password:"",
   
})

const history = useNavigate();

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

const loginUser =async(e)=>{
    e.preventDefault();

    const {email,password} = inpval;

   if(email=== ""){
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
    else{
       
        const data = await fetch("http://localhost:5005/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email, password
            })

           });

           const res = await data.json();

           console.log(res);
           
           if(res.status==201)
           {
             localStorage.setItem("usersdatatoken",res.result.token)
            history("/dashboard");
            setInpval({...inpval,email:"",password:"",})
           }




    }
}

  return (
    <>
    <section>
    <div className="form_data">
        <div className="form_heading">
            <h1>Welcome back, Login</h1>
            <p>Hi, we are glad you are back, please login</p>
        </div>

        <form>
            <div className="form_input">
                <label htmlFor="email">Email</label>
                <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder="Enter your email address"/>

            </div>

            <div className="form_input">
                <label htmlFor="password">Password</label>
                <div className="two">
                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id="password" placeholder="Enter your password"/>
                <div className='showpass' onClick={()=> setPassShow(!passShow)}>
                {!passShow ? "Show" : "Hide"}
                
                </div>
                </div>                
                
            </div>
            <button className='btn' onClick={loginUser}>Login</button>
            <p>You don't have an Account? <NavLink to="/register">Sign Up</NavLink></p>
        </form>



    </div>

    </section>
    
    </>
  )
}

export default Login