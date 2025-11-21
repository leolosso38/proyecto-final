import "dotenv/config";

// Import the functions you eed from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG_aWqPFVfmnqW4mzZtfPOINXJWvUavW8",
  authDomain: "proyecto-final-cbf7e.firebaseapp.com",
  projectId: "proyecto-final-cbf7e",
  storageBucket: "proyecto-final-cbf7e.firebasestorage.app",
  messagingSenderId: "700068824428",
  appId: "1:700068824428:web:5e4380ac4af77ecd08df49",
  measurementId: "G-RFJ7BGBBSH",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp);

export { db };
