import './App.css'
import Header from "./components/Header.jsx"
import Searchbar from "./components/Searchbar.jsx"
import Bookcard from "./components/Bookcard.jsx"
import Information from "./components/Information.jsx"

import Favorites from './Pages/Favorites'
import Detail from './Pages/Detail'
import Signup from './Pages/Signup'
import Login from './Pages/Login'

import React, { useState } from 'react';
import {Routes, Route} from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from "./components/Navbar/Navbar.jsx"

import { getFavorites, uid, getUserData } from './utils/firebase'



let bookStartInt=0;

export default function App() {
  const navigator = useNavigate();
  

let pageCount = null;
let bookTitles = ["title1"];
let bookAuthor = ["author1"];
let imageSrc = ["img1"];

const [user,setUser] = useState({login:false});
const[books, setBooks] = useState([]);
//const[bookStartInt, setStart] = useState([0]);

const[currentPage, setPage] = useState([1]);
const[searchTerm,setSearchTerm]=useState("")
const[favoriteBooks,setFavorite]=useState([])
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






function addFavorite(book){
  console.log(favoriteBooks)
  console.log(favoriteBooks.indexOf(book))
  if(favoriteBooks.indexOf(book)==-1){
    setFavorite([...favoriteBooks,book])
  }else{
    let arr=favoriteBooks;
    let index=favoriteBooks.indexOf(book);
  
 
    let result=[]
    for(let i=0;i<arr.length;i++){
      if(i != index){
        result.push(arr[i])
      }
    }
 


    setFavorite(result)
    
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
    marked={favoriteBooks.indexOf(books[i].selfLink)>-1}
    user={user}
/>  )
  }
 }
 return arr;

}






  return (
  
 
  <div className='App'>
  <Header/>
  <Navbar user={user} setUser={setUser}/>

    <Routes> 
    
{user.login&&
  <Route path="/favorites" element={ <Favorites favoriteBooks={favoriteBooks} addFavorite={addFavorite} user={user} /> }/>
 }
  <Route path="/home" element={ <> <Searchbar handleSearch={handleSearch} goLeft={goLeft} goRight={goRight} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> <Result /> </> } exact/>
  
  <Route path="/detail" element={ <Detail /> }/>

  <Route path="/signup" element={ <Signup/>}/>

  <Route path="/login" element={ <Login setFavorite={setFavorite} setUser={setUser}/>}/>
     
   </Routes>
  
   

  </div>
 
  
  )
}
