import LoginForm from "../components/LoginForm.jsx"

export default function Login({setUser,setFavorite}){
    

    return(
    
      <> 


      <LoginForm setFavorite={setFavorite} setUser={setUser}/>
      
      </>
    )
    
      
    }