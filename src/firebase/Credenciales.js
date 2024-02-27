// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrmEAB2bkho7MdCoRHEmGZEx3Cgwfq1w0",
  authDomain: "truekland-3e516.firebaseapp.com",
  projectId: "truekland-3e516",
  storageBucket: "truekland-3e516.appspot.com",
  messagingSenderId: "611122136957",
  appId: "1:611122136957:web:7c01ffedaf3f16bc93ee14",
  measurementId: "G-FVPE4MBSZ5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;