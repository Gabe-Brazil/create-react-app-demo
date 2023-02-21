import { signIn,SignInEmail } from "../utils/firebase";
import { logOut } from "../utils/firebase";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { getUserData } from "../utils/firebase";
import { getFavorites } from "../utils/firebase";

 function Login({setUser,setFavorite}){
  const [form,setForm]=useState({email:"",password:""})
  const navigator = useNavigate();
  const handleLogIn=async(e,provider)=>{
    e.preventDefault();
try{
     if(provider=="google"){
      const user=await signIn();
      console.log(user)
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
    alert("succefully log in ")
    const data= await  getUserData(user.user.uid)
   setUser({
        name:data.name,
        photo:data.photoURL,
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