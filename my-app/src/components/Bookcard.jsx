import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Bookcard({title,author,image,self,addFavorite,marked,loading}){
const location=useLocation();
 
if(loading){
  return <h4>Loading...</h4>
}
 

    return(
      <div className="card">
        <h3 >{title}</h3>  
        
        
        <p className="author"> {author} </p>
        <img className="thumbnail" src={image}/>
        <button onClick={()=>addFavorite(self)}>{marked?"Remove from ":"Add to "}Favorite </button>    
        {location.pathname=="/favorites" &&
        
        <Link to="/detail"> 
      <button> Expand </button>
      
      </Link>
   }
      
        </div>
      
    
    )
    }

    export default Bookcard;