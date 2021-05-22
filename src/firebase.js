import firebase from "firebase/app";
import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDRhZM60YJKnxGUQb5gFImtRVcYqY2WiZg",
    authDomain: "prueba-final-vue.firebaseapp.com",
    projectId: "prueba-final-vue",
    storageBucket: "prueba-final-vue.appspot.com",
    messagingSenderId: "297808085932",
    appId: "1:297808085932:web:2653e93722a0d3c5b73009",
    measurementId: "G-NW76BG3KQV"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;