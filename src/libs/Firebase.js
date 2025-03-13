// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaf9eo5oFVVqbuQ7P5P1HStIOlN1j3iXk",
  authDomain: "sibalog-14716.firebaseapp.com",
  projectId: "sibalog-14716",
  storageBucket: "sibalog-14716.firebasestorage.app",
  messagingSenderId: "766748854502",
  appId: "1:766748854502:web:cf1fc55d30acf207035327",
  measurementId: "G-3WTVQTJT1K",
  databaseURL: "https://sibalog-14716-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);