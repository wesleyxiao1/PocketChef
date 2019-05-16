import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBMwAbyzaAwkBvzXxCR81WgkhJjtkSHu0A",
    authDomain: "cse110firebase-5bc2b.firebaseapp.com",
    databaseURL: "https://cse110firebase-5bc2b.firebaseio.com",
    projectId: "cse110firebase-5bc2b",
    storageBucket: "cse110firebase-5bc2b.appspot.com",
    messagingSenderId: "80585370432",
    appId: "1:80585370432:web:74ddabf619cf8ba4"
};

class Firebase{
    constructor(){
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    doCreateUser = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doLoginUser = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();  
    
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
}

export default Firebase;