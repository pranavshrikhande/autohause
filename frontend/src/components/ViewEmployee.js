import React, { useEffect , useContext,useState } from 'react';
import {Table ,TableHead, TableCell, Paper, TableRow, TableBody, Button, styled } from '@mui/material'

import { useNavigate, Link } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import './mix.css';
//import Table from 'react-bootstrap/Table';


const ViewEmployee = () => {
    

    const {loginData ,setLoginData} = useContext(LoginContext);
    const [user,setUser] =useState([]);

    const [file,setFile] = useState();

    const history= useNavigate();

    
const getFile=()=>{

    return fetch("http://localhost:5005/downloadcsv").then((response)=> response.json()).then((data)=>setFile(data));
}

const fetchData = () => {
    return fetch("http://localhost:5005/getempdata")
          .then((response) => response.json())
          .then((data) => setUser(data.resp));
  }

  useEffect(() => {
    fetchData();
  },[])

useEffect(()=>{
    fetchData();
},[]);

console.log(user);

const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`;
const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;


  return (
    <>
    <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell></TableCell>
                </THead>
                </TableHead>
                <TableBody>
                {user.map((user,key) => (
                    <TRow key={user._id}>
                        <TableCell>{user.firstname}</TableCell> {/* change it to user.id to use JSON Server */}
                        <TableCell>{user.lastname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                            <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/editUser/${user.email}`}>Edit</Button>
                            <Button color="error" variant="contained">Delete</Button>
                        </TableCell>
                        </TRow>
                ))}
                </TableBody>

                </StyledTable>
                <form>
<button className='btn' onClick={getFile}>Get CSV file</button>
</form>
    
    </>
  )
}

export default ViewEmployee