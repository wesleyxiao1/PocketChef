import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fire from '../Fire/fire';
import Nav from '../Navbar/navbar';
import '../../styles/index.css'

export default class Home extends Component {

  constructor(props){
    super(props);
    this.logoutFirebase = this.logoutFirebase.bind(this);
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
              <li><a href="#pantry">Pantry</a></li>
              <li><a href="#contact">Profile</a></li>
              {/* login button */}
              <li style={{float: 'right'}}><button onclick="document.getElementById('id01').style.display='block'" id="login">Login</button></li>
            </ul>


        <div className="search-box">
          <input type="text" name className="search-txt" placeholder="Search Recipes" />
          <a className="search-btn" href="#"><i className="fas fa-search" /></a>
        </div>
      </div>

        {/*TODO Put these buttons in a navbar, make it look nice*/}
        {/* <ul>
          <li><button id="pantry" onClick={this.goToPantry}>Pantry</button></li>
          <li><button id="list" onclick={this.goToList}>List</button></li>
          <li><button id="recipes" onClick={this.goToRecipes}>Recipes</button></li>
          <li><button id="favorites" onClick={this.goToFavorites}>Favorites</button></li>
          <li><button id="profile" onClick={this.goToProfile}>Profile</button></li>
        </ul> */}
        <Nav/>
        <div className="form-group">
            <button type="LogOut" onClick={this.logoutFirebase} class="LoginButton">LogOut</button>
          </div>
      </div>
    )
  }
}