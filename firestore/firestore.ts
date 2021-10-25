import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs} from 'firebase/firestore/lite';

// Firebase Config
const firebaseConfig = {
    apiKey: "your config",
    authDomain: "your config",
    projectId: "your config",
    storageBucket: "your config",
    messagingSenderId: "your config",
    appId: "your config",
    measurementId: "your config"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
