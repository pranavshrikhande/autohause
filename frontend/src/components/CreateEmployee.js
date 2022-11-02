import React, { useEffect , useContext, useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import './mix.css';

const CreateEmployee = () => {
    
    const {loginData, setLoginData} = useContext(LoginContext);

    console.log('logindata-->',loginData.ValidUserOne.firstname);

    const history = useNavigate();

    const [inpval, setInpval] = useState({
        firstname:"",
        lastname:"",
        email:"",
        username:"",
        address:"",
        role:"",
        
    })

    console.log(inpval);

    const setVal=(e)=>{
        console.log(e.target.value);

        const {name,value} = e.target;

        setInpval(()=>{
            return{
                ...inpval,
                [name]:value
            }
        })
    };

    const addEmployeeData = async(e)=>{
        e.preventDefault();

        const {firstname,lastname,email,username,address,
        role} = inpval;

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
        else if(username=== ""){
            alert("Please enter your username");
        }
        else if(address=== ""){
            alert("Please enter your address");
        }
        else if(role ==="")
        {
            alert("Please select your role");
        }
        else{
            console.log("User registration successfully done");

            const data = await fetch("http://localhost:5005/createEmployee",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    username,
                    address,
                    role,
                    createdBy:loginData.ValidUserOne.firstname
                })
            });

            const res =await data.json();

            console.log(res);

            if (res.status==201)
            {
                alert("Employee details entered");
                setInpval({...inpval,
                firstname:"",
                lastname:"",
                email:"",
                username:"",
                address:"",
                role:""
                })
            }

            
        }
    };


  return (
    <>
    <div className="form_data">
        <div className="form_heading">
            <h1>Fill Employee Details</h1>
            <p>Please enter the details</p>
        </div>

    <form>
        <div className='form_input'>
            <label htmlFor="firstname">FirstName</label>
            <input type="text" onChange={setVal} value = {inpval.firstname}
            name="firstname" id="firstname" placeholder="Enter your name"/>
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
                <label htmlFor="role">Role</label>
                <select name="role"  onChange={setVal} value={inpval.role}id="role">
                    <option value="-">Select Below</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
               

            </div>
            <br/><br/>

            <button className='btn' onClick={addEmployeeData}>Submit</button>


        </form>
    </div>
    
    </>
  )
}

export default CreateEmployee