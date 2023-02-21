import React, { useState, useEffect } from 'react';
import { ProfileCardContainer, ProfileCardHeader, ProfileCardInfo, ProfileCardButton } from './ProfileCardElements';
import { logOut, getUserData, uid } from '../../utils/firebase';




const ProfileCard = ({ user, setUser }) => {
    const handleLogout=()=>{
        logOut().then(()=>{
          setUser({login:false})
        })
    
      }

      

      




    return (
     
      <ProfileCardContainer>
        <ProfileCardHeader>{user.name}</ProfileCardHeader>
        <ProfileCardInfo>{user.email}</ProfileCardInfo>
        <ProfileCardButton onClick={handleLogout}>Log out</ProfileCardButton>
      </ProfileCardContainer>
    );
  };

export default ProfileCard;