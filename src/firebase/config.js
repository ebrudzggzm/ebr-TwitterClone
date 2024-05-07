// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey:`${import.meta.env.VITE_API_KEY}`,
  authDomain: "ebr-my.firebaseapp.com",
  projectId: "ebr-my",
  storageBucket: "ebr-my.appspot.com",
  messagingSenderId: "1003396902510",
  appId: "1:1003396902510:web:ad7a0362963925c016807f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db =  getFirestore(app);
export const storage = getStorage(app);