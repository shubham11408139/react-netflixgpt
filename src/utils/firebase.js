// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE-bpVvQEGmqIOlyBcW76cMBqJYKbrzAs",
  authDomain: "react-netflix-gpt-ea9b2.firebaseapp.com",
  projectId: "react-netflix-gpt-ea9b2",
  storageBucket: "react-netflix-gpt-ea9b2.firebasestorage.app",
  messagingSenderId: "903846705029",
  appId: "1:903846705029:web:d54fdb9daaf0e75f1ef6ec",
  measurementId: "G-EFQQDB4MBV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);