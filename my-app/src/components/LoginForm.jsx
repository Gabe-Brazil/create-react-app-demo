import { signIn,SignInEmail } from "../utils/firebase";
import { logOut } from "../utils/firebase";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { getUserData } from "../utils/firebase";
import { getFavorites } from "../utils/firebase";
import Button from '@mui/material/Button';

 function Login({setUser,setFavorite}){
  const [form,setForm]=useState({email:"",password:""})
  const navigator = useNavigate();
  const handleLogIn=async(e,provider)=>{
    e.preventDefault();
try{
     if(provider=="google"){
      const user=await signIn();
      console.log(user)
      window.localStorage.setItem("token",user.user.accessToken)
      setUser({
        name:user.displayName,
        photo:user.photoURL,
        email:user.email,
        id:user.uid,
        login:true
      })
      const favoritesArr=await getFavorites(user)
      setFavorite(favoritesArr)

  }else if(provider=="email"){
    const user=await SignInEmail(form.email,form.password)
    window.localStorage.setItem("token",user.user.accessToken)
    console.log(user);
    alert("succefully log in ")
    const data= await  getUserData(user.user.uid)
    console.log(data)
   setUser({
        name:data.name,
        photo:data.photourl,
        email:"",
        id:user.user.uid,
        login:true
       })


       const favoritesArr=await getFavorites(user.user)
       setFavorite(favoritesArr)
      navigator("/home")
 
    }

}catch(e){
  console.error(e);
}

  }
    return(
        <>
       

 <div className="login-form-bd">
 <Button variant="contained">Hello World</Button>
    

        <div className="form-wrapper">
          <div className="form-container">
            <h1> Please Login</h1>
            <form>
              <div className="form-control">
                <input type="text" required  value={form.email} onChange={(e)=>{setForm({...form,email:e.target.value})}}></input>
                <label> Email</label>
              </div>
      
              <div className="form-control">
                <input type="password"  value={form.password} onChange={(e)=>{setForm({...form,password:e.target.value})}} required></input>
                <label> Password</label>
              </div>
              <button onClick={(e)=>{handleLogIn(e,"email")}} className="login-btn">Login</button>
              <button onClick={(e)=>{handleLogIn(e,"google")}}>Log in with Google</button>
              <p className="text">Don't have an account? <a href="register.html"> Register</a></p>
            </form>
          </div>
        </div>
      </div>

      </>
    
    )
    }
    
    export default Login;