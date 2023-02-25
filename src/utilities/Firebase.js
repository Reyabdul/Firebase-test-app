//Import the functions you need from the SDK you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

//TODO: Add SDKs for firebase products that you want to use
//https:firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

//Accessing Firebase API Key from .env
const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

//Web app's Firebase configuration
const firebaseConfig = {
    apiKey: FIREBASE_KEY,
    authDomain: "test-app-5b5cb.firebaseapp.com",
    projectId: "test-app-5b5cb",
    storageBucket: "test-app-5b5cb.appspot.com",
    messagingSenderId: "358048831723",
    appId: "1:358048831723:web:fbd8b64cdbf6e24bedc6ae",
    measurementId: "G-7Z3ZE2956N"
  };


export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);