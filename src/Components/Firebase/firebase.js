import * as firebase from "firebase";
import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyAXZ2ncKT7181aGDOYXuCL3sjAWW-8jaqs",
  authDomain: "gwnotes-cfed0.firebaseapp.com",
  databaseURL: "https://gwnotes-cfed0.firebaseio.com",
  projectId: "gwnotes-cfed0",
  storageBucket: "gwnotes-cfed0.appspot.com",
  messagingSenderId: "430073025448",
  appId: "1:430073025448:web:d3915a3fe1bc0022c8839d",
  measurementId: "G-W08ZHYDFHC",
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export const auth = firebase.auth();

export default firebase;
