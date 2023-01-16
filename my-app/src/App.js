import './App.css'
import Header from "./components/Header.jsx"
import Searchbar from "./components/Searchbar.jsx"
import Searchbutton from "./components/Searchbutton.jsx"
import Bookcard from "./components/Bookcard.jsx"
import Favorites from './Pages/Favorites'
import Information from "./components/Information"
import React, { useState } from 'react';
import {Routes, Route} from "react-router-dom"
import { useNavigate } from 'react-router-dom'





let bookStartInt=0;

export default function App() {
  const navigator=useNavigate();

let pageCount = null;
let bookTitles = ["title1"];
let bookAuthor = ["author1"];
let imageSrc = ["img1"];

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
/>  )
  }
 }
 return arr;

}





  return (
  
 
  <div className='App'>
  <Header/>
  <button onClick={()=>{navigator("/favorites")}}>go to favorite</button>
    <Routes> 
    

  <Route path="/favorites" element={ <Favorites favoriteBooks={favoriteBooks} addFavorite={addFavorite} /> }/>
  <Route path="/" element={ <> <Searchbar handleSearch={handleSearch} goLeft={goLeft} goRight={goRight} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> <Result /> </> } exact/>
   
     
   </Routes>
  
   

  </div>
 
  
  )
}
