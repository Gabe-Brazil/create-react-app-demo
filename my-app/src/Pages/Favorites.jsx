import { useEffect ,useState} from "react"
import Bookcard from "../components/Bookcard";
import Detailbutton from "../components/Detailbutton";
import { useNavigate } from "react-router";
export default function Favorites({favoriteBooks,addFavorite, user}){

  const navigator=useNavigate();
const [books,setBooks]=useState([]);
const [loading,setLoading]=useState(true)
//const { id } = useParams();
  useEffect(()=>{
    setLoading(true)
    Promise.all(favoriteBooks.map(book=>fetch(book))).then(responses =>
      Promise.all(responses.map(res => res.json()))
  ).then(data => {
   
    const arr=[]

      data.forEach(item=>{
        const info=item.volumeInfo
          arr.push({...info,
            image:info.imageLinks.thumbnail ,
            author:(info.authors&&info.authors.length>0)?item.volumeInfo.authors[0]:"" 
            ,marked:favoriteBooks.indexOf(item.selfLink)>-1
          })
      })
      //arr is empty 
      console.log(arr.length==0)
      if(arr.length==0 || !user.login){
       navigator("/home")
      }
     setBooks(arr)
     setLoading(false);
  })

  },[])

    return(
    
      <> 
      <div className="favorites" > 
         {books.length>0 &&
         books.map(({title,image,author,marked})=>{
          return <> <Bookcard
           title={title}
           image={image}
           author={author}
           marked={marked}
           addFavorite={addFavorite}
           loading={loading}
           />
      

        </>
         })

         }
      </div>
      </>
    )
    
      
    }

    // Fix blank data being added to favorites (causes system to break)