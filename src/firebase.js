import { initializeApp } from "firebase/app";
import { getStorage  } from "firebase/storage";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAwsf2C9wiWbbSKO8mNKXNRNaUpMgZzcPA",
  authDomain: "chat-e3b75.firebaseapp.com",
  projectId: "chat-e3b75",
  storageBucket: "chat-e3b75.appspot.com",
  messagingSenderId: "547269511888",
  appId: "1:547269511888:web:b3c18d7cd4a8c531ac2cd5"
};
 
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();