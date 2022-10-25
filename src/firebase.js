// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAx_MssGiysoqsIu835fLt9CuBthpKOuXA",
    authDomain: "e-clone-d2cad.firebaseapp.com",
    projectId: "e-clone-d2cad",
    storageBucket: "e-clone-d2cad.appspot.com",
    messagingSenderId: "699541427477",
    appId: "1:699541427477:web:ff222ab9c169003b3b451c",
    measurementId: "G-M7QSFMPSZN"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth =firebase.auth();
  export {db,auth};