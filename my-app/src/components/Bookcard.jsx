function Bookcard({title,author,image,addFavorite}){
    return(
      <div className="card">
        <h3 >{title}</h3>  
        
        
        <p className="author"> {author} </p>
        <img className="thumbnail" src={image}/>
        <button onClick={addFavorite}> Add to Favorite </button>    
        </div>
      
    
    )
    }
    
    export default Bookcard;