import { useReducer } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { addToFavorites } from "../utils/firebase";
function Bookcard({title,author,image,self,addFavorite,marked,loading,user}){
const location=useLocation();
 
if(loading){
  return <h4>Loading...</h4>
}
 

    return(
      <div className="card">
       <div className='titlebox'>  <h3 >{title}</h3>  
        
        
        <p className="author"> {author} </p> </div>
        <img className="thumbnail" src={image}/>
        {user && user.login && <button onClick={async()=>{
          console.log(self)
          console.log(user.id)
        await addToFavorites(self,user.id)
          addFavorite(self)}}>{marked?"Remove from ":"Add to "}Favorite </button>   }
        {location.pathname=="/favorites" &&
        
        <Link to="/detail"> 
      <button> Expand </button>
      </Link>

      
   }
      
        </div>
      
    
    )
    }

    export default Bookcard;