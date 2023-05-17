import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Lead from "../Components/Lead";


const PrivateRoutes = ({children,...rest}) => {
   const {user,loading} = useContext(UserContext)
   if(!user){
  
    return <div><Lead/></div>
   }
return(
    user ? <Outlet/> :<Navigate to='/login' />
)
}
export default PrivateRoutes;