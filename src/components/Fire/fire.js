import React, {Component} from 'react'
import firebase from 'firebase'
import app from 'firebase/app'


const firebaseConfig = {
  apiKey: "AIzaSyB4bHKX0o4VElwkU-2wIbjVO0Y1AUe5FgQ",
  authDomain: "pocketchef-7e363.firebaseapp.com",
  databaseURL: "https://pocketchef-7e363.firebaseio.com",
  projectId: "pocketchef-7e363",
  storageBucket: "pocketchef-7e363.appspot.com",
  messagingSenderId: "452219660387",
  appId: "1:452219660387:web:ba350989e96eff5b"
};


const fire = firebase.initializeApp(firebaseConfig);
export default fire;
