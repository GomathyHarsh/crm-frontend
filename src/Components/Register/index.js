import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

const Register = () =>{
    
    const [userDetails,setUserDetails]= useState({
        name: '',
        email: '',
        password: '',
        mobileNumber: '',
        role: ''
    })
    const navigate = useNavigate();
    
    const handleForm = value =>{ 
        return setUserDetails(cred =>{
            return {...cred,...value}
        })
    }

    

    const handleRegisteration = async (event) =>{
     try{
      event.preventDefault(); // to prevant data and state,to carry the event- entire function execution
     // console.log('Logging in');
      const response= await axios.post(`${process.env.REACT_APP_BASE_URL}/register`,userDetails);
      if(response){
        navigate('/login');
      }
      
     }catch(error){
      console.log('error:',error);
     }
    }
    return(
        <section className="vh-80 ">
        <div className="mask d-flex align-items-center h-60 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" >
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
      
                    <form onSubmit={handleRegisteration}>
      
                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example1cg" value={userDetails.name} className="form-control form-control-lg"
                        onChange={(e) => handleForm({name: e.target.value})} />
                        <label className="form-label" for="form3Example1cg">Your Name</label>
                      </div>
      
                      <div className="form-outline mb-4">
                        <input type="email" id="form3Example3cg" value={userDetails.email}  className="form-control form-control-lg"
                        onChange={(e) => handleForm({email: e.target.value})} />
                        <label className="form-label" for="form3Example3cg">Your Email</label>
                      </div>
      
                      <div className="form-outline mb-4">
                        <input type="mobileNumber" id="form3Example4cg" value={userDetails.mobileNumber} className="form-control form-control-lg" 
                        onChange={(e) => handleForm({mobileNumber: e.target.value})}/>
                        <label className="form-label" for="form3Example4cg">Phone No</label>
                      </div>
      
                      <div className="form-outline mb-4">
                        <input type="password" id="form3Example4cdg" value={userDetails.password} className="form-control form-control-lg" 
                        onChange={(e) => handleForm({password:e.target.value})}/>
                        <label className="form-label" for="form3Example4cdg">Password</label>
                      </div>
                      <div>
                      <select className="form-select" aria-label="Default select example" value={userDetails.role} onChange={(e) => handleForm({role: e.target.value})}>
                         <option value="" disabled selected>Select your role</option>
                         <option value="user">User</option>
                         <option value="manager">Manager</option>
                         <option value="admin">Admin</option>
                      </select>

                      </div>
                     
      
                      <div className="d-flex justify-content-center">
                        <button type="submit"
                          className="btn btn-success mt-3 ">Register</button>
                      </div>
      
      
                    </form>
      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Register;
