// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLqyioPX2UNvLN-0csMEMYPyXERW2pJnM",
  authDomain: "pantry-tracker-29b27.firebaseapp.com",
  projectId: "pantry-tracker-29b27",
  storageBucket: "pantry-tracker-29b27.appspot.com",
  messagingSenderId: "823398601882",
  appId: "1:823398601882:web:9f2a4121783b7187367b23",
  measurementId: "G-RR2F9BQ0WX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };
