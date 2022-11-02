import React, { useEffect , useContext, useState } from 'react'
import { LoginContext } from './ContextProvider/Context';
import { useNavigate,useParams } from 'react-router-dom';
import './mix.css';

const initialValue={
    firstname:'',
    lastname:'',
    email_id:'',
    username:'',
    address:'',
    role:'',
}
const EditUser = () => {


    const [user, setUser] = useState(initialValue);

    //const { firstname,lastname,email_id,username,address,role} = user;

    
    const { email } = useParams();

     
    const navigate = useNavigate();

   

    const loadUserDetails = async ()=>{

        const response =await fetch(`http://localhost:5005/getemp/${email}`).then((response)=>response.json()).then((data)=> setUser(data));
        
        
        //console.log('response is',response);
        //setUser(response.emp);
        
    }

    useEffect(()=>{

        loadUserDetails();
    },[])

   
   const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({...user, [e.target.name]: e.target.value})
}

const editUserDetails = async(e)=>{

    e.preventDefault();

    

    try{
        //console.log('username is-->',user.email);

        let firstname = user.firstname;
        let lastname = user.lastname;
        let email =user.email;
        let address = user.address;
        let role = user.role;
        let username = user.username;

        const data = await fetch(`http://localhost:5005/editempl/${email}`,{
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
                role
            })
        });

        const res = await data.json();

        if(res.status==201)
        {
            alert("Edited successfully");
            navigate('/viewEmployee');
        }


    }catch(error)
    {
        console.log('Error while calling edit user Api', error);
    }

}


  return (
    <>
   
   <div className="form_data">
        <div className="form_heading">
            <h1>Edit Employee Details</h1>
            <p>Please enter the details</p>
        </div>

    <form>
        <div className='form_input'>
            <label htmlFor="firstname">FirstName</label>
            <input type="text" onChange = {(e)=> onValueChange(e)} value={user.firstname}
            name="firstname" id="firstname" placeholder="Enter your name"/>
        </div>

        <div className="form_input">
                <label htmlFor="lastname">Last Name</label>
                <input type="text" onChange = {(e)=> onValueChange(e)} value={user.lastname}
                  name="lastname" id="lastname" placeholder="Enter your last name"/>

            </div>

            <div className="form_input">
                <label htmlFor="email">Email</label>
                <input type="email" onChange = {(e)=> onValueChange(e)} value={user.email}
                 name="email" id="email" placeholder="Enter your email address"/>

            </div>

            <div className="form_input">
                <label htmlFor="username">Username</label>
                <input type="text" onChange = {(e)=> onValueChange(e)} value={user.username} 
                name="username" id="username" placeholder="Enter your username"/>

            </div>

            <div className="form_input">
                <label htmlFor="address">Address</label>
                <input type="text"  onChange = {(e)=> onValueChange(e)} value={user.address}
                name="address" id="address" placeholder="Enter your address"/>

            </div>

            <div className="form_input">
                <label htmlFor="role">Role</label>
                <select onChange = {(e)=> onValueChange(e)} value={user.role}
                name="role" id="role">
                    <option value={user.role}>{user.role}</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
               

            </div>
            <br/><br/>

            <button className='btn' onClick={editUserDetails} >Submit</button>


        </form>
    </div>
    
    </>
  )
}

export default EditUser