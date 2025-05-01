// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-hbojpwHk8eQSA-9qOhlu7-020d3ivAY",
  authDomain: "sibalog-7d685.firebaseapp.com",
  databaseURL: "https://sibalog-7d685-default-rtdb.firebaseio.com",
  projectId: "sibalog-7d685",
  storageBucket: "sibalog-7d685.firebasestorage.app",
  messagingSenderId: "279144653404",
  appId: "1:279144653404:web:c4960d7a22d9ab1872bc99",
  measurementId: "G-21TJTVK00C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);