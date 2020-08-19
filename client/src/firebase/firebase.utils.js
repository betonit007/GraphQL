import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAlNXjDfc0-g--73DKA40dtiUgoM8jYGg4",
    authDomain: "graphql-41.firebaseapp.com",
    databaseURL: "https://graphql-41.firebaseio.com",
    projectId: "graphql-41",
    storageBucket: "graphql-41.appspot.com",
    messagingSenderId: "798339024609",
    appId: "1:798339024609:web:acd48ea095c85e070319a0",
    measurementId: "G-432S3N94JK"
  };

  //Initialize firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  
  const gProvider = new firebase.auth.GoogleAuthProvider();
  //const faceProvider = new firebase.auth.FacebookAuthProvider();
  
  gProvider.setCustomParameters({ prompt: "select_account" });
  export const signInWithGoogle = () => auth.signInWithPopup(gProvider);
  //export const signInWithFaceBook = () => auth.signInWithPopup(faceProvider);
  
  export default firebase;
  