import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fire from '../Fire/fire';
import Pantry from '../Pantry/pantry';
import List from '../List/list';
import Recipes from '../Recipes/recipes';
import Favorites from '../Favorites/favorites';
import Profile from '../Profile/profile';

export default class Home extends Component {

  constructor(props){
    super(props);
    this.logoutFirebase = this.logoutFirebase.bind(this);
  }

  goToPantry(current){
    ReactDOM.render(<Pantry/>, document.getElementById("root"));
  }
  goToList(current){
    ReactDOM.render(<List/>, document.getElementById("root"));
  }
  goToRecipes(current){
    ReactDOM.render(<Recipes/>, document.getElementById("root"));
  }
  goToFavorites(current){
    ReactDOM.render(<Favorites/>, document.getElementById("root"));
  }
  goToProfile(current){
    ReactDOM.render(<Profile/>, document.getElementById("root"));
  }

  logoutFirebase()
  {
      fire.auth().signOut();
  }
  render() {
    return (
      <div className="Home">
        <h1>You are Home</h1>
        {/*TODO Put these buttons in a navbar, make it look nice*/}
        <ul>
          <li><button id="pantry" onClick={this.goToPantry}>Pantry</button></li>
          <li><button id="list" onclick={this.goToList}>List</button></li>
          <li><button id="recipes" onClick={this.goToRecipes}>Recipes</button></li>
          <li><button id="favorites" onClick={this.goToFavorites}>Favorites</button></li>
          <li><button id="profile" onClick={this.goToProfile}>Profile</button></li>
        </ul>
        <div className="form-group">
            <button type="LogOut" onClick={this.logoutFirebase} class="LoginButton">LogOut</button>
          </div>
      </div>
    )
  }
}