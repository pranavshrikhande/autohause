import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import CreateEmployee from './components/CreateEmployee';
import ViewEmployee from './components/ViewEmployee';
import EditUser from './components/EditUser';
import {Routes, Route} from "react-router-dom";

import 'bootstrap';

function App() {
  return (
    <>
     <Header />
     <Routes>

      <Route path='/' element={<Login />}/>

      <Route path='/register' element={<Register />}/>

      <Route path='/dashboard' element={<Dashboard />}/>

      <Route path='/*' element={<Error />}/>

      <Route path="/createEmployee" element={<CreateEmployee/>} />

      <Route path="/viewEmployee" element={<ViewEmployee/>} />

      <Route path="/editUser/:email" element={<EditUser/>} />

     </Routes>
    
     </>
      );
}

export default App;
