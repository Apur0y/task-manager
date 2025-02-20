// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASP97ptLOQN495fyYQT-OcBLiXjERyz7c",
  authDomain: "task-manager-5fc26.firebaseapp.com",
  projectId: "task-manager-5fc26",
  storageBucket: "task-manager-5fc26.firebasestorage.app",
  messagingSenderId: "644546016922",
  appId: "1:644546016922:web:bc0cc85d088b3195e21123"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);