// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    getAuth,
    getReactNativePersistence,
} from "firebase/auth";
import "@firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKgzDDXq35XKiH5NIR00wd4ec33l0jqJQ",
    authDomain: "testotp-9b7ba.firebaseapp.com",
    projectId: "testotp-9b7ba",
    storageBucket: "testotp-9b7ba.appspot.com",
    messagingSenderId: "1087789076618",
    appId: "1:1087789076618:web:d819897acb28fe659f1d73",
    measurementId: "G-GXKPRBBPKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, app };