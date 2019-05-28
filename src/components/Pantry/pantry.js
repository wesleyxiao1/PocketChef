import fire from '../Fire/fire';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

////So I think the onDocumentupdate function is a little whack. It updates early 
export default class Pantry extends Component{

    constructor(props){
        super(props);
        this.db = fire.firestore();
        //need to get user email and pass into the reference below
        this.email = fire.auth().currentUser.email;
        this.docRef = fire.firestore().collection('users').doc(this.email);
        this.docRef.get().then(doc => {
          if( !doc.exists){
            this.docRef.set({
              pantry: []
            });
          }
        });
        this.docUnsub = null;
        this.changingInput = this.changingInput.bind(this);
        this.addToPantry = this.addToPantry.bind(this);

        this.state = {
            favorites: [],
            pantry: [],
            newIngredient: ""
        };
    }

    changingInput(current) {
      this.setState({
        [current.target.name]: current.target.value 
      });
    }

    addToPantry(current){
      ////TODO: get this working with firebase
      this.setState({
        pantry: this.state.pantry.concat(this.state.newIngredient),
        newIngredient: ""
      });
      console.log(this.state.pantry);
      this.docRef.update({
        pantry: this.state.pantry
      });
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
                <input
                  type="text"
                  placeholder="Enter ingredient to add"
                  name="newIngredient"
                  id="ingredient-input"
                  value={this.state.newIngredient}
                  onChange={this.changingInput}
                  required />
                <button
                  type = "submit"
                  id="additem"
                  onClick={this.addToPantry}
                  class="btn btn-primary"
                  >
                  Add to Pantry
                  </button>
            </div>
        );
    }



}