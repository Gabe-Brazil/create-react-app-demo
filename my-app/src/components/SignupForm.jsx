import { signUp,verify ,initializeUserDatabase} from "../utils/firebase"; 
import { useState } from "react";


function SignupForm(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");
  
  const handleSignUp=async(e)=>{
    e.preventDefault();
    try{
    const userCred=await signUp(email,password)
    await verify()
    await initializeUserDatabase(userCred.user,username)
    console.log(userCred)
  }catch(e){
    alert("signup success")
    console.log(e)
  }
  }
    return(
        <>
        <div className="login-form-bd">
        <div className="form-wrapper">
          <div className="form-container">
            <h1> Please Signup</h1>
            <form>
              <div className="form-control">
                <input type="text" required value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
                <label> Username</label>
              </div>

              <div className="form-control">
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" required></input>
                <label> Email</label>
              </div>
      
              <div className="form-control">
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}}  required></input>
                <label> Password </label>
              </div>
              <button onClick={handleSignUp} className="login-btn">Sign Up</button>
             
            </form>
          </div>
        </div>
      </div>

      </>
    
    )
    }
    
    export default SignupForm;