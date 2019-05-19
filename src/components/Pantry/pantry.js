import fire from '../Fire/fire';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
export default class Pantry extends Component{

    constructor(props){
        super(props);
        this.db = fire.firestore();
        //hardcoded to my account for testing, will have to get user email later
        var favorites = this.db.collection('users').doc('nraguila.test@ucsd.edu');
        var items = favorites.get().then(doc => {
            if(!doc.exists){
                console.log("no doc");
            }
            else{
                let arr = doc.getString("test");
                ReactDOM.render(arr, document.getElementById("main"));
            }
        }).catch(err => {
            console.log("err", err);
        });
    }

    render(){
        return(
            <div id="main">
                Pantry
            </div>
        )
    }



}