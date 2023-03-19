import React, { useState, useEffect } from 'react';
import { getFavorites, uid, getUserData } from '../utils/firebase'
//import { user, setUser, favoriteBooks, setFavorite } from '../App.js'
import Searchbar from "../components/Searchbar.jsx"
import Bookcard from "../components/Bookcard.jsx"
import Information from "../components/Information.jsx"



export default function Home({addFavorite,user,setUser,favoriteBooks,setFavorite}){

let bookStartInt=0;

const[books, setBooks] = useState([]);
//const[bookStartInt, setStart] = useState([0]);

const[currentPage, setPage] = useState([1]);
const[searchTerm,setSearchTerm]=useState("")

const[resultNumber,setResultNumber]=useState(0)

const BOOKURL = "https://www.googleapis.com/books/v1/volumes?q=";
const MAXRESULTS = "&maxResults=6"
const STARTINDEXSTRING = "&startIndex="


function handleSearch(){
    backendCallAPI();
      

}



function backendCallAPI(){
   
console.log(BOOKURL + searchTerm + MAXRESULTS + STARTINDEXSTRING + bookStartInt)
  fetch(BOOKURL + searchTerm + MAXRESULTS + STARTINDEXSTRING + bookStartInt).then((response)=>{
    return response.json();
}).then((data)=>{


setBooks(data.items)
console.log(data.items)
console.log(data.totalItems)
//setResultNumber(books.totalItems);

}).catch((e)=>{
    
  })
}



function goRight(){
//setStart(Number(bookStartInt) + 6);
bookStartInt=bookStartInt+6;
//setPage(++pageCount);
backendCallAPI();

}

function goLeft(){
  if(bookStartInt>=5){
//setStart(Number(bookStartInt) - 6);
bookStartInt=bookStartInt-6;
//setPage(--pageCount);
backendCallAPI();
  }
}


const Result=()=>{

  return <div className='container'> 
      {books.length>0 &&
      <>
        <RenderBooks/>
      
      </>
      }
     </div>
 }


useEffect(()=>{
//return getFavorites(user);
///setFavortiest to the return of the getFavorites after proccessing
},[user])


useEffect(() => {

  async function fetchUserData() {
    const userData = await getUserData();
    console.log(userData)
    const currentUser = userData.find((u) => u.id === uid);
    setUser(currentUser);
    console.log(user, "userdata from useEffect app.js")
  }

  fetchUserData();
}, []);





 const RenderBooks=()=>{
  const arr=[]
 for(let i=0;i<5;i++){
  if(books[i] && books[i].volumeInfo){
  arr.push(<Bookcard
    title={books[i].volumeInfo.title?books[i].volumeInfo.title:"Unknown Title" }
    author={books[i].volumeInfo.authors?books[i].volumeInfo.authors[0]:"Unknown Author"}
    image={books[i].volumeInfo.imageLinks?books[i].volumeInfo.imageLinks.thumbnail:""}
    self={books[i].selfLink}
    addFavorite={addFavorite}
    marked={favoriteBooks && favoriteBooks.indexOf(books[i].selfLink)>-1}
    user={user}
/>  )
  }
 }

 return arr;

}


    return(
    
      <> <Searchbar handleSearch={handleSearch} goLeft={goLeft} goRight={goRight} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> <Result /> </>
    )
    
      
    }