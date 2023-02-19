import { signIn,SignInEmail } from "../utils/firebase";
import { logOut } from "../utils/firebase";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
function Login({setUser}){
  const [form,setForm]=useState({email:"",password:""})
  const navigator = useNavigate();
  const handleLogIn=(e,provider)=>{
    e.preventDefault();

     if(provider=="google"){
   signIn().then(user=>{
      console.log(user)
      //setUser(user)
      setUser({
        name:user.displayName,
        photo:user.photoURL,
        email:user.email,
        id:user.uid,
        login:true
      })
  

      ////database[id] /collection 

   }).catch(e=>{
    alert(e)
   })
  }else if(provider=="email"){
    SignInEmail(form.email,form.password).then(user=>{
      console.log(user)
      alert("succefully log in ")
      navigator("/home")
      setUser({
        name:"",
        photo:"",
        email:user.email,
        id:user.uid,
        login:true
      })

    })
  }

  }
    return(
        <>
        <div class="login-form-bd">
        <div class="form-wrapper">
          <div class="form-container">
            <h1> Please Login</h1>
            <form>
              <div class="form-control">
                <input type="text" required  value={form.email} onChange={(e)=>{setForm({...form,email:e.target.value})}}></input>
                <label> Email</label>
              </div>
      
              <div class="form-control">
                <input type="password"  value={form.password} onChange={(e)=>{setForm({...form,password:e.target.value})}} required></input>
                <label> Password</label>
              </div>
              <button onClick={(e)=>{handleLogIn(e,"email")}} class="login-btn">Login</button>
              <button onClick={(e)=>{handleLogIn(e,"google")}}>Log in with Google</button>
              <p class="text">Don't have an account? <a href="register.html"> Register</a></p>
            </form>
          </div>
        </div>
      </div>

      </>
    
    )
    }
    
    export default Login;