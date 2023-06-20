import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFHvgLt_zSUkQQHesTS_gT6e3g_c--R20",
  authDomain: "easybuy-d639a.firebaseapp.com",
  databaseURL: "https://easybuy-d639a-default-rtdb.firebaseio.com",
  projectId: "easybuy-d639a",
  storageBucket: "easybuy-d639a.appspot.com",
  messagingSenderId: "4234040569",
  appId: "1:4234040569:web:f910d919a4ec95d080be28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export default app;
