import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import './header.css';
import { LoginContext } from './ContextProvider/Context';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate, NavLink} from 'react-router-dom';




const Header = () => {

  const {loginData,setLoginData} = useContext(LoginContext);

  const history = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick=(event)=>{
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
};

const logoutuser = async()=>{
  let token = localStorage.getItem("usersdatatoken");
  console.log('token here is---->',token);


  const res = await fetch("http://localhost:5005/logout",{
    method: "GET",
    headers:{
      "Content-Type":"application/json",
      "Authorization":token,
      Accept: "application/json"
    },
      });

  const data =await res.json();
  console.log(data);

  if(data.status == 201)
  {
    
   
    localStorage.removeItem("usersdatatoken");
    setLoginData(false);
    history("/");
  
  }
  else{
    console.log("error");
  }


}

const goEmployee=()=>{
  history("/createEmployee")
}

const viewEmp=()=>{
  history("/viewEmployee");
}

const goDash=()=>{
  history("/dashboard")
}



const goError =()=>{
  history("*");
}

  console.log(loginData);

  return (
    <header>
        <nav><h1>AutoHause</h1>
            <div className='avatar'>
            {
                loginData.ValidUserOne ? <Avatar style={{background:"blue"}}  onClick={handleClick}>{loginData.ValidUserOne.firstname[0].toUpperCase()}</Avatar>: <Avatar style={{background:"blue"}} 
                onClick={handleClick}/>
             }
                 
            </div>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby':'basic-button',}}>

              {
                loginData.ValidUserOne ? (
                <>
                  <MenuItem onClick={ ()=>{goDash();handleClose()}}>Profile</MenuItem>
                  <MenuItem onClick={()=>{goEmployee(); handleClose()}}>Create Employee</MenuItem>
                  <MenuItem onClick={()=>{viewEmp(); handleClose()}}>View Employees</MenuItem>
                
                  <MenuItem onClick={()=>{logoutuser(); handleClose()}}>Logout</MenuItem>
                
                </>
                ): (
                <>
                  <MenuItem onClick={ ()=>{goError(); handleClose()}}>Profile</MenuItem>
                  </>
                  )


              }

              
            
          
            </Menu>
        </nav>
    </header>
  )
}

export default Header