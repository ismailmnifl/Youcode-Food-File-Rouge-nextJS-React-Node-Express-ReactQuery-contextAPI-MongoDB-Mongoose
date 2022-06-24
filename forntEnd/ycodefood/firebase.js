// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3UOfHh8jltp2ElcwVfEGIURUqYXPjex8",
  authDomain: "filerouge-320612.firebaseapp.com",
  projectId: "filerouge-320612",
  storageBucket: "filerouge-320612.appspot.com",
  messagingSenderId: "986814446788",
  appId: "1:986814446788:web:1874edeeaf1f269d875d91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);