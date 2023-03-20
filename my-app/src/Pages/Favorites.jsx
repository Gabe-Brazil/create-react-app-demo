import { useEffect ,useState} from "react"
import Bookcard from "../components/Bookcard";
import Detailbutton from "../components/Detailbutton";
import { useNavigate } from "react-router";
export default function Favorites({favoriteBooks,addFavorite, user}){

  const navigator=useNavigate();
const [books,setBooks]=useState([]);


useEffect(() => {
  
  const arr = favoriteBooks.map(book => {
    return {
      ...book.volumeInfo,
      image: book.volumeInfo.imageLinks.thumbnail,
      author: (book.volumeInfo.authors && book.volumeInfo.authors.length > 0) ? book.volumeInfo.authors[0] : "",
      marked: favoriteBooks.indexOf(book.selfLink) > -1,
      link: book.selfLink
    };
  });
  setBooks(arr);

}, [favoriteBooks]);

    return(
    
      <> 
      <div className="favorites" > 
         {books.length>0 &&
         books.map(({title,image,author,marked,link})=>{
          return <> <Bookcard
           title={title ? title : "Unknown Title"}
           image={image}
           author={author ? author : "Unknown Author"}
           marked={true}
           addFavorite={addFavorite}
           user={user}
           self={link}
           />
      

        </>
         })

         }
      </div>
      </>
    )
    
      
    }

