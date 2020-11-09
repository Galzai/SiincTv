import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/analytics';

var firebaseConfig = {
    apiKey: "AIzaSyCCh_3ko1IsjZdtWIibJuiKL9N7sMJ_Lt4",
    authDomain: "siinctv.firebaseapp.com",
    databaseURL: "https://siinctv.firebaseio.com",
    projectId: "siinctv",
    storageBucket: "siinctv.appspot.com",
    messagingSenderId: "264330109663",
    appId: "1:264330109663:web:fa3a99064afa1e85703f6a",
    measurementId: "G-0FT6NQR4SN"
};


const firebaseApp = firebase.initializeApp(firebaseConfig)
firebase.analytics();
export default firebaseApp