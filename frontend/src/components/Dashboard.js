import React, { useEffect , useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';

const Dashboard = () => {

const {loginData, setLoginData} = useContext(LoginContext);

//console.log(loginData.ValidUserOne.email);

//console.log('login Data is-->',loginData.ValidUserOne.email);


    const history = useNavigate();
    const DashboardValid = async()=>{

        let token = localStorage.getItem("usersdatatoken");
       
        const res = await fetch("http://localhost:5005/validuser",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":token
            }
        });

        const data = await res.json();

        if(data.status ==401 || !data)
        {
            history("*");
        }
        else{
            setLoginData(data);
            history("/dashboard");

        }
    }

    useEffect(()=>{
        DashboardValid();
    },[]);

  return (
    <>
    <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
        <img src="./man.png" style={{width:"200px", marginTop:20}} alt="" />
    <h1>Hi:{loginData? loginData.ValidUserOne.firstname :""}</h1>


    </div>
    </>
  )
}

export default Dashboard