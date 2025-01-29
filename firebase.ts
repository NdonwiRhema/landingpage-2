// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKnhWFYonfIRLNW6hq2pWGax8wjA1TK6U",
  authDomain: "billsplit-d206c.firebaseapp.com",
  projectId: "billsplit-d206c",
  storageBucket: "billsplit-d206c.appspot.com",
  messagingSenderId: "118151825853",
  appId: "1:118151825853:web:0dfcfe69698f286ce5ead4",
  measurementId: "G-89S0SH173B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
// const analytics = getAnalytics(app);
export default db