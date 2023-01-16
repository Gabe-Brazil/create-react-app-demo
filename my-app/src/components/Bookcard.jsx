function Bookcard({title,author,image,self,addFavorite,marked}){

 
 
  
    return(
      <div className="card">
        <h3 >{title}</h3>  
        
        
        <p className="author"> {author} </p>
        <img className="thumbnail" src={image}/>
        <button onClick={()=>addFavorite(self)}>{marked?"Remove from":"Add to"}Favorite </button>    
        </div>
      
    
    )
    }

    export default Bookcard;