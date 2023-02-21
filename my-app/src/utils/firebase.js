// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, setDoc,getDoc, getDocs, collection } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { generateId } from "./functions";
import { getAuth,
   signInWithPopup,
    GoogleAuthProvider, 
    signOut, 
    createUserWithEmailAndPassword,
     sendEmailVerification , 
     signInWithEmailAndPassword 
     } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGmDegw0sB6kVzXdogmKUll5FLHoXQlr0",
  authDomain: "book-finder-66e68.firebaseapp.com",
  projectId: "book-finder-66e68",
  storageBucket: "book-finder-66e68.appspot.com",
  messagingSenderId: "787011487126",
  appId: "1:787011487126:web:df5cfa41590bb22e0589b7",
  measurementId: "G-LK49VBTXR9"
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const currentUser = auth.currentUser;

export const uid = currentUser ? currentUser.uid : null;

export const signIn=()=>signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    return user
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    
  });
 

 export const  signUp=(email, password) =>{
 
return  createUserWithEmailAndPassword(auth, email, password)
  
    
  }
export const verify=()=> {
    return sendEmailVerification(auth.currentUser, {
      url: "http://localhost:3000/",
    });
  }

   






export const logOut=()=>signOut(auth).then(() => {
    console.log("sign out succesffully ")
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });








  export const SignInEmail=(email, password)=> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  export  const  initializeUserDatabase=async(user,username)=>{
   
   let favoriteId=generateId()

  await setDoc(doc(db, "users", user.uid), {
   favorites:favoriteId,
    name: username,
    photourl: ""
  });
  await setDoc(doc(db,"favorites",favoriteId),{

  })
}






export async function getUserData(uid) {
  const db = getFirestore();


  ///data of all users
  const userRef =doc(db,"users",uid);
  ///getDoc  pass reference to a document  :doc(db,"",):odd number of argument
  ///getDocs pass reference to a collection even number 
  const document = await getDoc(userRef);

  const userData = document.data();
  
  //javascript object

  return userData;
}

export const addToFavorites=async(book, uid)=>{
//find the user favorite id
const docRef = doc(db, "users",uid);///
const document = await getDoc(docRef);
if (document.exists()) {
  const favoritesLink=document.data().favorites

  const docRef2=doc(db,"favorites",favoritesLink)
  const docSnap2=await getDoc(docRef2)
  

  ///docSnap2 contains all previous favorites
  console.log(docSnap2.data())
  
  await setDoc(docRef2, {
    ...docSnap2.data(),
    [generateId()]:book
  });


}else{
  console.error("document is not exist")
}

//add to the favorites collection 

}




export const getFavorites =async(user)=>{
const docRef = doc(db, "users", user.uid);///
const docSnap = await getDoc(docRef);
///docSnap javascript Object that have fields as properties 


if (docSnap.exists()) {
  const favoritesLink=docSnap.data().favorites
  const docRef2=doc(db,"favorites",favoritesLink)
  const docSnap2=await getDoc(docRef2)
   if(docSnap2.exists()){
   // console.log("Users favorites is :" +JSON.stringify( docSnap2.data()))
  const dataObj=docSnap2.data();
 
  let values=Object.values(dataObj)
   return values;///array of books self links
   }else{
    console.log("snap does not exists")
   }

} else {

  console.log("No such document!");
}
}
