import './App.css'
import Header from "./components/Header.jsx"
import { addFavorite } from './Pages/Home'

import Favorites from './Pages/Favorites'
import Detail from './Pages/Detail'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'

import { uploadProfilePhoto, useAuth,singInToken } from './utils/firebase'
import React, { useState } from 'react';
import {Routes, Route} from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { generateToken } from './utils/functions'
import Navbar from "./components/Navbar/Navbar.jsx"





export default function App() {



  const navigator = useNavigate();
  const [user,setUser] = useState({login:false});
  const[favoriteBooks,setFavorite]=useState([])
  
  
  
  function addFavorite(book){
     console.log("favorite books",favoriteBooks)
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



  
  return (
  
  <div className='App'>
  <Header/>
  <Navbar user={user} setUser={setUser}/>
    
    
    <Routes> 
    
{user.login&&
  <Route path="/favorites" element={ <Favorites 
  favoriteBooks={favoriteBooks} 
  addFavorite={addFavorite}
  user={user}
  setUser={setUser}
  setFavortie={setFavorite}  /> }/>
 }
  <Route path="/home" element={ <Home user={user} favoriteBooks={favoriteBooks}  setFavorite={setFavorite} addFavorite={addFavorite}/>} exact/>
  
  <Route path="/detail" element={ <Detail /> }/>

  <Route path="/signup" element={ <Signup/>}/>

  <Route path="/login" element={ <Login setFavorite={setFavorite} setUser={setUser}/>}/>
     
   </Routes>
  
   

  </div>
 
  
  )
}
