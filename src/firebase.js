import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDPovbQz-bht1GEb7zR-p_3We-9JiQuy8",
  authDomain: "ecommerce-b00d5.firebaseapp.com",
  projectId: "ecommerce-b00d5",
  storageBucket: "ecommerce-b00d5.appspot.com",
  messagingSenderId: "608186965136",
  appId: "1:608186965136:web:110e0ea93257607ac1cc15"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
 
// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 