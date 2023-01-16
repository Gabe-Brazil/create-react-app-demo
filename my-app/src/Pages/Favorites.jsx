import { useEffect ,useState} from "react"
import Bookcard from "../components/Bookcard";
export default function Favorites({favoriteBooks,addFavorite}){
const [books,setBooks]=useState([]);

  useEffect(()=>{
     
    Promise.all(favoriteBooks.map(book=>fetch(book))).then(responses =>
      Promise.all(responses.map(res => res.json()))
  ).then(data => {
    console.log(data)
    const arr=[]

      data.forEach(item=>{
          arr.push({...item.volumeInfo,
            image:item.volumeInfo.imageLinks.thumbnail ,
            author:item.volumeInfo.authors.length>0?item.volumeInfo.authors[0]:"" 
            ,marked:favoriteBooks.indexOf(item.selfLink)>-1
          })
      })
     
     setBooks(arr)
  })

  },[])

    return(
    
      <> 
         {books.length>0 &&
         books.map(({title,image,author,marked})=>{
          return <Bookcard
           title={title}
           image={image}
           author={author}
           marked={marked}
           addFavorite={addFavorite}
         
          />
          
    
         })

         }
      
      </>
    )
    
      
    }