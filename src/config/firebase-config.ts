// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgP_wSTjuLlh-EwhpMsSu-aWSh4QMjcIo",
  authDomain: "merrbio.firebaseapp.com",
  databaseURL: "https://merrbio-default-rtdb.firebaseio.com",
  projectId: "merrbio",
  storageBucket: "merrbio.firebasestorage.app",
  messagingSenderId: "308989360396",
  appId: "1:308989360396:web:1ac83ded70f799cc57f129",
  measurementId: "G-LJEP9D2R5W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore();
