import React, { useState, useEffect } from 'react';
import { ProfileCardContainer, ProfileCardHeader, ProfileCardInfo, ProfileCardButton } from './ProfileCardElements';
import { logOut, getUserData, uid, uploadProfilePhoto } from '../../utils/firebase';



const ProfileCard = ({ user, setUser }) => {
    const handleLogout=()=>{
        logOut().then(()=>{
          setUser({login:false})
        })
    
      }

      
     
      const loadPic=(e)=>{

        var fr = new FileReader();
      const file=e.target.files[0];
      //setFile(file);
      fr.onload = function () {
        document.getElementById("profile-image").src = fr.result;
        uploadProfilePhoto(file,user.id)
        //setTempUrl(fr.result);
        console.log("Image set")
      }
      fr.readAsDataURL(file);
      
      }
     
      
      




    return (
     
      <ProfileCardContainer>
        <ProfileCardHeader>{user.name}</ProfileCardHeader>
        <ProfileCardInfo>{user.email}</ProfileCardInfo>

        <input type="file" accept="image/png, image/jpeg" onChange={(e)=>{loadPic(e)}}  />
          <img id="profile-image" />

        <ProfileCardButton onClick={handleLogout}>Log out</ProfileCardButton>
      </ProfileCardContainer>
      
    );
  };

  
export default ProfileCard;