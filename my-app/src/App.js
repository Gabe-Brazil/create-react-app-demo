import './App.css'
import Header from "./components/Header.jsx"
import Searchbar from "./components/Searchbar.jsx"
import Searchbutton from "./components/Searchbutton.jsx"
import Bookcard from "./components/Bookcard.jsx"
import Information from "./components/Information"
import React, { useState } from 'react';





export default function App() {

let pageCount = null;
let bookTitles = ["title1"];
let bookAuthor = ["author1"];
let imageSrc = ["img1"];

const[books, setBooks] = useState([]);
const[bookStartInt, setStart] = useState([0]);
const[currentPage, setPage] = useState([1]);
const[searchTerm,setSearchTerm]=useState("")
const[favoriteBooks,setFavorite]=useState([])
const[resultNumber,setResultNumber]=useState(0)

const BOOKURL = "https://www.googleapis.com/books/v1/volumes?q=";
const MAXRESULTS = "&maxResults=12"
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

console.log(data.totalItems)
//setResultNumber(books.totalItems);

}).catch((e)=>{
    
  })
}



function goRight(){
setStart(Number.parseInt(bookStartInt) + 6);
//setPage(++pageCount);
backendCallAPI();

}

function goLeft(){
  if(bookStartInt>=5){
setStart(Number.parseInt(bookStartInt) - 6);
//setPage(--pageCount);
backendCallAPI();
  }
}

const RenderBooks=()=>{
  const arr=[]
 for(let i=0;i<5;i++){
  if(books[i] && books[i].volumeInfo){
  arr.push(<Bookcard
    title={books[i].volumeInfo.title?books[i].volumeInfo.title:"Unknown Title" }
    author={books[i].volumeInfo.authors?books[i].volumeInfo.authors[0]:"Unknown Author"}
    image={books[i].volumeInfo.imageLinks?books[i].volumeInfo.imageLinks.thumbnail:""}
/>  )
  }
 }
 return arr;

}
const Result=()=>{

 return <div className='container'> 
     {books.length>0 &&
       <RenderBooks />
     }
    </div>
}

function addFavorite(){
setFavorite([])


}








// When scrolling back and forth through the book results, it cannot go back to the first result (because 'useState' is delayed by one???)

  return (
  <div className='App'>
    <Header/>
    <Searchbar handleSearch={handleSearch} goLeft={goLeft} goRight={goRight} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
     {/*<Information resultNumber={5} />*/}
    <Result/>
  </div>
  )
}
