import fire from '../Fire/fire';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
export default class Pantry extends Component{

    constructor(props){
        super(props);
        this.db = fire.firestore();
        this.ref = fire.firestore().collection('users');
        this.unsubscribe = null;
        this.state = {
            users: []
        };

        // this.ref.on('value', dataSnapshot => {
        //     let items = [];
        //     dataSnapshot.forEach(childSnapshot => {
        //         let item = childSnapshot.val();
        //         item['.key'] = childSnapshot.key;
        //         items.push(item);
        //     })
        //     this.setState({items});
        // })
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
                    {this.state.users.map(user => 
                        <tr>
                            <td>{user.favorites}</td>
                        </tr>
                        )}
                </body>
            </div>
        );
    }



}