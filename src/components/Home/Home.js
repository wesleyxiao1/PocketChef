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
        <Nav/>
        <title>PocketChef</title>
        <div className="search-box">
          <input type="text" name className="search-txt" placeholder="Search Recipes" />
          <a className="search-btn" href="#"><i className="fas fa-search" /></a>
        </div>
      
      </div>
    )
  }
}