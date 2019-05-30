import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyB4bHKX0o4VElwkU-2wIbjVO0Y1AUe5FgQ",
  authDomain: "pocketchef-7e363.firebaseapp.com",
  databaseURL: "https://pocketchef-7e363.firebaseio.com",
  projectId: "pocketchef-7e363",
  storageBucket: "pocketchef-7e363.appspot.com",
  messagingSenderId: "452219660387",
  appId: "1:452219660387:web:ba350989e96eff5b"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();


    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;
  }

  

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

// *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Pantry API ***

  pantry_item = uid => this.db.ref(`users/`);

  pantry_items = uid => this.db.ref(`users/${uid}`);
}

export default Firebase;