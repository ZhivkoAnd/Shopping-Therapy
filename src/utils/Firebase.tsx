import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmssDIG1DsxzjmYimr9tigSkPIUeVpKwk",
  authDomain: "vacations-ts.firebaseapp.com",
  projectId: "vacations-ts",
  storageBucket: "vacations-ts.appspot.com",
  messagingSenderId: "531772920181",
  appId: "1:531772920181:web:e49bcacbc9eba6b3fec33c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Get the auth
export const auth = getAuth(app);
