
import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
  
const Navbar = () => {
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
        <div class='NavBtn'> 
        <NavBtn>
          <NavBtnLink to='/signin'>Log In</NavBtnLink>
        </NavBtn>

        <NavBtn>
          <NavBtnLink to='/signin'>Sign Up</NavBtnLink>
          
        </NavBtn>
        </div>
      </Nav>
    </>
  );
};
  
export default Navbar;