import fire from '../Fire/fire';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
export default class Pantry extends Component{

    constructor(props){
        super(props);
        this.db = fire.firestore();
        this.ref = fire.firestore().collection('users');
        this.docRef = fire.firestore().collection('users').doc('nraguila@ucsd.edu');
        this.unsubscribe = null;
        this.docUnsub = null;
        this.state = {
            users: [],
            favorites: []
        };
    }

    onDocumentUpdate = (documentSnapshot) => {
        let favorites = documentSnapshot.get('favorites');
        this.setState({favorites});
    }

    onCollectionUpdate = (querySnapshot) => {
        const users = [];

        querySnapshot.forEach((doc) => {
            const{ favorites } = doc.data();
            users.push({
                key: doc.id,
                doc,
                favorites
            });
        });
        this.setState({
            users
        });
    }

    componentDidMount(){
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.docUnsub = this.docRef.onSnapshot(this.onDocumentUpdate);
    }
    render(){
        // const records = this.state.items.map(items => 
        //     <tr key={items.favorites}>
        //         <td>{items.favorites}</td>
        //     </tr>
        //     );
        return(
            <div id="main">
                Pantry
                <body>
                    {this.state.favorites.map(fav => 
                        <tr>
                            <td>{fav}</td>
                        </tr>
                        )}
                </body>
            </div>
        );
    }



}