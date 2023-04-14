import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHo_IVecYa_widFhM4XYJzfmjZqCDtTgk",
  authDomain: "miami-ai-hackathon.firebaseapp.com",
  databaseURL: "https://miami-ai-hackathon-default-rtdb.firebaseio.com",
  projectId: "miami-ai-hackathon",
  storageBucket: "miami-ai-hackathon.appspot.com",
  messagingSenderId: "968150982638",
  appId: "1:968150982638:web:8bf10798d540edf67978ff",
  measurementId: "G-T9ZKMVS33Y",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();
