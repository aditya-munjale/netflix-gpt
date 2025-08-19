// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdiL5H0b4CaPUuTwfyqgxPm_Grtt56sPk",
  authDomain: "netflixgpt-c1b6f.firebaseapp.com",
  projectId: "netflixgpt-c1b6f",
  storageBucket: "netflixgpt-c1b6f.firebasestorage.app",
  messagingSenderId: "942631616907",
  appId: "1:942631616907:web:d6b2b66334777fc89c2f8e",
  measurementId: "G-RT096J5V5M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
