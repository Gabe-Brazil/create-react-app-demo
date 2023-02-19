
import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
  

import { logOut } from '../../utils/firebase';
const Navbar = ({user,setUser}) => {
   
  const handleLogout=()=>{
    logOut().then(()=>{
      setUser({login:false})
    })

  }
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='/home' activeStyle>
            Home
          </NavLink>
          <NavLink to='/favorites' activeStyle>
            Favorites
          </NavLink>
         



          
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
      {!user.login &&
       <div class='NavBtn'> 
        <NavBtn>
          <NavBtnLink to='/login'>Log In</NavBtnLink>
        </NavBtn>

        <NavBtn>
          <NavBtnLink to='/signup'>Sign Up</NavBtnLink>
          
        </NavBtn>
        </div>}

        {user.login &&
         <NavBtn onClick={handleLogout}>
        Sign out
       </NavBtn>

        }
      </Nav>
    </>
  );
};
  
export default Navbar;