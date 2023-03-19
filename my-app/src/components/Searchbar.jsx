

function Searchbar({searchTerm,setSearchTerm,handleSearch,goLeft,goRight}){
    return(
    <div className="form__group field">
      <form>
        <input type="input" value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} className="form__field" placeholder=" "                 
          name="name" id='search-box' required />
      <label htmlFor="search-box" className="form__label"> Search</label>
   </form>

    <button onClick={goLeft}> Back </button>
    <button onClick={goRight}> Next </button>
    <button className="gradient-button gradient-button-3" onClick={handleSearch}> Search! </button>
    
    </div>
      
    )
    
    
    
    
      
    }
    
    
    
    
    
    
    
    
    
    export default Searchbar;