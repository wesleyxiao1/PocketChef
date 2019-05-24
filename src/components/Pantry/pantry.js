import fire from '../Fire/fire';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Pantry extends Component{

    constructor(props){
        super(props);
        this.db = fire.firestore();
        //need to get user email and pass into the reference below
        this.email = fire.auth().currentUser.email;
        this.docRef = fire.firestore().collection('users').doc(this.email);
        this.docUnsub = null;

        this.state = {
            favorites: [],
            pantry: []
        };
    }

    onDocumentUpdate = (documentSnapshot) => {
        let favorites = documentSnapshot.get('pantry');
        
        //if the favorites field in the DB doesnt exist, or has no entries
        if (typeof favorites === "undefined" || favorites.length == 0){
            let favorites = ["no pantry items"];
            this.setState({favorites});
        }else{
            this.setState({favorites});
        }
    }

    componentDidMount(){
        this.docUnsub = this.docRef.onSnapshot(this.onDocumentUpdate);
    }
    render(){
        return(
            <div id="main">
                Pantry
                <h1>
                    {this.state.favorites.map(fav => 
                        <tr>
                            <td>{fav}</td>
                        </tr>
                        )}
                </h1>
                <button id="additem">Add to Pantry</button>
            </div>
        );
    }



}