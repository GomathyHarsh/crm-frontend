import {useState} from "react";
import { Routes,Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/crm.css";
import UserContext from "./Context/UserContext";
import useFindUser from "./Hooks/useFindUser";
import Login from "./Components/Login";
import Register from "./Components/Register";

import PublicRoutes from "./Routes/PublicRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";
import ResetPassword from "./Components/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword";
import Header from "./Components/Header";
import Lead from "./Components/Lead";



function App() {
  const [user,setUser,loading] = useFindUser();

  return (
   <>
    <UserContext.Provider value={{user,loading}}>
        <div >

          <div><Header/></div>
          
    <Routes>
      <Route element={<PublicRoutes/>}>
      <Route path='/' element={<Login/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/forgotPassword' element={<ForgotPassword/>} />
      <Route path='/passwordReset' element={<ResetPassword/>} />
      
      </Route>
      <Route element={<PrivateRoutes/>}>
     
      <Route path='/leads' element={<Lead/>} />
      

      
      </Route>
     </Routes>
    </div>
    

    </UserContext.Provider>
   </>
  );
}

export default App;
