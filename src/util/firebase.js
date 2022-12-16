// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzfOLNuGyqVg8-RRyBPS94TKn-iM89IWc",
  authDomain: "volleyball-25620.firebaseapp.com",
  databaseURL: "https://volleyball-25620-default-rtdb.firebaseio.com",
  projectId: "volleyball-25620",
  storageBucket: "volleyball-25620.appspot.com",
  messagingSenderId: "465182733473",
  appId: "1:465182733473:web:eeed4c759806602538ece0",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
