import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fire from '../Fire/fire';
import Nav from '../Navbar/navbar';
import '../../styles/home.css';
import Pantry from '../Pantry/pantry';
export default class Home extends Component {

  constructor(props){
    super(props);
    this.logoutFirebase = this.logoutFirebase.bind(this);
  }
  goToPantry(current){
    ReactDOM.render(<Pantry/>, document.getElementById("root"));
  }
  logoutFirebase()
  {
      fire.auth().signOut();
  }
  render() {
    return (
      <div className="Home">

        <title>PocketChef</title>
          {/* navigation bar */}
          <div>
            <ul className="navigationbar">
              <li><a href="#home">Home</a></li>
              <li><a onClick={this.goToPantry} href="#pantry">Pantry</a></li>
              <li><a href="#contact">Profile</a></li>
              {/* login button */}
              <li style={{float: 'right'}}><button type="LogOut" onClick={this.logoutFirebase} class="LoginButton" id="login">LogOut</button></li>
            </ul>
          </div>
        <div className="search-box">
          <input type="text" name className="search-txt" placeholder="Search Recipes" />
          <a className="search-btn" href="#"><i className="fas fa-search" /></a>
        </div>


        {/*TODO Put these buttons in a navbar, make it look nice*/}
        {/* <ul>
          <li><button id="pantry" onClick={this.goToPantry}>Pantry</button></li>
          <li><button id="list" onclick={this.goToList}>List</button></li>
          <li><button id="recipes" onClick={this.goToRecipes}>Recipes</button></li>
          <li><button id="favorites" onClick={this.goToFavorites}>Favorites</button></li>
          <li><button id="profile" onClick={this.goToProfile}>Profile</button></li>
        </ul> 
        <Nav/>*/}
      
      </div>
    )
  }
}