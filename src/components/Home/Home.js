import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import fire from '../Fire/fire';
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Nav from '../Navbar/navbar';
import '../../styles/home.css';

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
      
        <h2>Home</h2>
          {/* navigation bar */}



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
