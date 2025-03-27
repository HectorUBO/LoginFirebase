// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDre7kpZ_rLWjPjjiY6YSl37zMwKTuQyJo",
  authDomain: "auth-25c7c.firebaseapp.com",
  projectId: "auth-25c7c",
  storageBucket: "auth-25c7c.firebasestorage.app",
  messagingSenderId: "395129974829",
  appId: "1:395129974829:web:2bebe14dae4300dcb208a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);