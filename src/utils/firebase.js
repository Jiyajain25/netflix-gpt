// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA27-wyXQDAg-7uF--CtOQULJlzqsllPn0",
  authDomain: "netflixgpt-df780.firebaseapp.com",
  projectId: "netflixgpt-df780",
  storageBucket: "netflixgpt-df780.firebasestorage.app",
  messagingSenderId: "904520988024",
  appId: "1:904520988024:web:4349674ae06102af00848d",
  measurementId: "G-J6D9PM5B22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();