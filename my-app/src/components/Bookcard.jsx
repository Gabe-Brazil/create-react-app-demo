import { useReducer } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "../utils/firebase";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const [cardWidth,cardHeight,ratio]=[345,340,1];

function Bookcard({title,author,image,self,addFavorite,marked,loading,user}){
const location=useLocation();
 
if(loading){
  return <h4>Loading...</h4>
}
 

return (
  <Card sx={{ maxWidth:cardWidth,minWidth:cardWidth }}>
     
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {author}
        </Typography>
      </CardContent>
      <CardMedia
        sx={{ height: cardHeight }}
        image={image}
        title="bookCover"
      />
      <CardActions>
      <Link style={{textDecoration:"none"}} to="/detail"> 
      <Button> Expand </Button>
      </Link>
      {console.log(user)}
      {user && user.login && <Button onClick={async()=>{
        
        if (marked) {
          await removeFromFavorites(self, user.id);
        } else {
          await addToFavorites(self, user.id);
        }
        addFavorite(self)}}>{marked?"Remove from ":"Add to "}Favorite </Button>   }
        
      </CardActions>
    </Card>
)




    return(
      
      <div className="card">
      
       <div className='titlebox'>  <h3 >{title}</h3>  
        
        
        <p className="author"> {author} </p> </div>
        <img className="thumbnail" src={image}/>
        {user && user.login && <button onClick={async()=>{
        
          if (marked) {
            await removeFromFavorites(self, user.id);
          } else {
            await addToFavorites(self, user.id);
          }
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