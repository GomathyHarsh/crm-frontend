import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login =() =>{
    const [userCred,setUserCred] = useState({email:'', password:''});
    const navigate=useNavigate();
    const handleCred = value =>{ 
        return setUserCred(cred =>{
            return {...cred,...value}
        })
    }

    

    const handleLogin = async (event) =>{
     try{
      event.preventDefault(); // to prevant data and state,to carry the event- entire function execution
     // console.log('Logging in');
      const response= await axios.post(`${process.env.REACT_APP_BASE_URL}/signin`,{...userCred});
      if(response){
        navigate('/leads');
      }
      
     }catch(error){
      console.log('error:',error);
     }
    }
    return(
       <div className="App bg-black">
        <section className="vh-100">
  <div className="container-fluid h-custom text-white">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <h2>Client-centric, Customer-oriented,User-friendly...</h2>
        <img src="https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form onSubmit={handleLogin}>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
          
          </div>

          <div class="divider d-flex align-items-center my-4">
            <h3 class="text-center fw-bold mx-3 mb-0">Login</h3>
          </div>

          
          <div class="form-outline mb-4">
            <input type="email" id="form3Example3" class="form-control form-control-lg"
               value={userCred.email} onChange={(e) => handleCred({email:e.target.value})}
              placeholder="Enter a valid email address" />
            <label class="form-label" for="form3Example3">Email address</label>
          </div>

       
          <div class="form-outline mb-3">
            <input type="password" id="form3Example4" class="form-control form-control-lg"
            value={userCred.password} onChange={(e) => handleCred({password:e.target.value})}
              placeholder="Enter password" />
            <label class="form-label" for="form3Example4">Password</label>
          </div>

          <div class="d-flex justify-content-between align-items-center">
          
           
            <a href="/forgotPassword" class="link-danger">Forgot password?</a>
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="submit" class="btn btn-primary btn-lg">Login</button>
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                class="link-danger">Register</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
  
</section>
       </div>
    )
}
export default Login;
