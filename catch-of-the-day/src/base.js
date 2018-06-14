import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDB0J76vWY88urQGJBsKko_NpW2LSHAeeQ",
    authDomain: "catch-of-the-day-santtu.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-santtu.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export {firebaseApp};

// this is a default export
export default base;