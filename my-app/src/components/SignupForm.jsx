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
        <div class="login-form-bd">
        <div class="form-wrapper">
          <div class="form-container">
            <h1> Please Signup</h1>
            <form>
              <div class="form-control">
                <input type="text" required value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
                <label> Username</label>
              </div>

              <div class="form-control">
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" required></input>
                <label> Email</label>
              </div>
      
              <div class="form-control">
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}}  required></input>
                <label> Password </label>
              </div>
              <button onClick={handleSignUp} class="login-btn">Sign Up</button>
             
            </form>
          </div>
        </div>
      </div>

      </>
    
    )
    }
    
    export default SignupForm;