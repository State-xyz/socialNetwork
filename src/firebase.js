import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCm78amjmGcOdD0nNekURBeNHZzXvTZAN0",
  authDomain: "homecoffee3009.firebaseapp.com",
  projectId: "homecoffee3009",
  storageBucket: "homecoffee3009.appspot.com",
  messagingSenderId: "1012157615902",
  appId: "1:1012157615902:web:13e8ff0567932cb8c0030f",
  measurementId: "G-DD76HN5PHN",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;