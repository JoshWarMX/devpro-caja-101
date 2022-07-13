import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// import Config from "react-native-config";

// const firebaseConfig = {
//   apiKey: Config.REACT_APP_FIREBASE_APIKEY,
//   authDomain: Config.REACT_APP_FIREBASE_AUTHDOMAIN,
//   projectId: Config.REACT_APP_FIREBASE_PROJECTID,
//   storageBucket: Config.REACT_APP_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: Config.REACT_APP_FIREBASE_MESSAGINGSENDERID,
//   appId: Config.REACT_APP_FIREBASE_APPID,
//   measurementId: Config.REACT_APP_FIREBASE_MEASUREMENTID,
// };

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


const db = firebase.firestore()
db.settings({ experimentalForceLongPolling: true, merge:true })

export default {
    db,
    firebase
};