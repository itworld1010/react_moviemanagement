import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBq23jYMGiEwMvAXXHC4QMKHLwInnYLEcA",
    authDomain: "moviekeeper-65458.firebaseapp.com",
    databaseURL: "https://moviekeeper-65458.firebaseio.com",
    storageBucket: "moviekeeper-65458.appspot.com",
    messagingSenderId: "331356584001"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
export const moviesFromDatabase = firebase.database().ref('movies');
