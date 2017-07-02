import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAT-v8o3B_cYtmaQOcOAaZypeXQC4W1lH8",
  authDomain: "banana-dd8f3.firebaseapp.com",
  databaseURL: "https://banana-dd8f3.firebaseio.com",
  projectId: "banana-dd8f3",
  storageBucket: "banana-dd8f3.appspot.com",
  messagingSenderId: "33006064885"
};

const fire = firebase.initializeApp(config);

const db = firebase.database(); //the real-time database
const auth = firebase.auth(); //the firebase auth namespace

let authData

const checkAuth = () => {
  auth.onAuthStateChanged((user) => {
    if(user) {
      authData = user
      return user
    } else {
      authData = null
      return authData
    }
  })
}

checkAuth();


export { db, auth, authData }

export default fire;
