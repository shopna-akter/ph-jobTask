import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDVV_Ohgq3fP2PoyJGRf1Uddpq2Uj_GcGY",
  authDomain: "ph-jobtask.firebaseapp.com",
  projectId: "ph-jobtask",
  storageBucket: "ph-jobtask.appspot.com",
  messagingSenderId: "419052620143",
  appId: "1:419052620143:web:4fa0e22e81e5d55136409a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);