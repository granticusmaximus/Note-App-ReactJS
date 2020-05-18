import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

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

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  //Notes API
  doCreateNotesTitleandContent = (notesTitle, noteContent) =>
    this.db.CreateNotesTitleandContent(notesTitle, noteContent);

  doUpdateNotesTitleandContent = (notesTitle, noteContent) =>
    this.db.UpdateNotesTitleandContent(notesTitle, noteContent);

  message = (nid) => this.db.ref(`messages/${nid}`);

  messages = () => this.db.ref("messages");

  // *** User API ***

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");
}

export default Firebase;
