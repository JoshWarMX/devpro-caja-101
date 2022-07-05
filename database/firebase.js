import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAlHFmm1bnibJq7qSw6g2rADH15DU6FRJ0",
  authDomain: "cajaapp-7f8a6.firebaseapp.com",
  projectId: "cajaapp-7f8a6",
  storageBucket: "cajaapp-7f8a6.appspot.com",
  messagingSenderId: "819251404448",
  appId: "1:819251404448:web:bf757b1cc1b20c1af7b3c5",
  measurementId: "G-BCKN7JHRTC"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
    db,
    firebase
};