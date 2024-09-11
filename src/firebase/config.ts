import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAIKFEoUXzZFXFUd0RdvxTLE-KXXFUkDDA",
  authDomain: "most-epic-lxp-a352e.firebaseapp.com",
  projectId: "most-epic-lxp-a352e",
  storageBucket: "most-epic-lxp-a352e.appspot.com",
  messagingSenderId: "494214135905",
  appId: "1:494214135905:web:ce10445aae97625fdc6a20",
  measurementId: "G-TM8HWWMM8C",
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

setPersistence(auth, browserLocalPersistence);
export const googleProvider = new GoogleAuthProvider();

// Export Firestore functions
export { auth, firestore, storage, analytics, collection, addDoc };
