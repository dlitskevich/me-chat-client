// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsXGwIPLCZMaA75jlkqvl8zodpma7ahY8",
  authDomain: "me-chat-893e7.firebaseapp.com",
  projectId: "me-chat-893e7",
  storageBucket: "me-chat-893e7.appspot.com",
  messagingSenderId: "998618730355",
  appId: "1:998618730355:web:663267f47ff01b2f0a7f06",
  measurementId: "G-RXFBDL5T53",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore();
