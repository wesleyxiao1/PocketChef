import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fire from '../Fire/fire';
import Nav from '../Navbar/navbar';
import '../../styles/home.css';
import axios from 'axios';

export default class Home extends Component {

  constructor(props){
    super(props);
    this.logoutFirebase = this.logoutFirebase.bind(this);
    this.state = {
      //username: ''
      recipeName: ''
    };

    this.handleClick = this.handleClick.bind(this);
  }

  logoutFirebase()
  {
      fire.auth().signOut();
  }

  /*handleClick () {
    axios.get('https://api.edamam.com/search?q=chicken&app_id=4863ac07&app_key=6e58a756abe12ad9122ba4525c78f6b9&from=0&to=3&calories=59')
      .then(response => this.setState({recipeName: response.hits.recipe.label}))
  }*/

  handleClick () {
    axios.get('https://www.food2fork.com/api/search?key=65ab939ee06267a743713a544290c2a2&q=shredded%20chicken')
      .then(response => this.setState({recipeName: response.recipes[1].title}))
  }

  /*
  handleClick () {
    axios.get('https://api.github.com/users/maecapozzi')
      .then(response => this.setState({username: response.data.name}))
    } */  

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
              <li style={{float: 'right'}}><button type="LogOut" onClick={this.logoutFirebase} class="LoginButton" id="login">LogOut</button></li>
            </ul>
          </div>
        {/*<div className="search-box">
          <input type="text" name className="search-txt" placeholder="Search Recipes" />
          <a className="search-btn" href="#"><i className="fas fa-search" /></a>
        </div>
        */}
        <div className='button__container'>
          <button className='button' onClick={this.handleClick}>
            Search
          </button>
          <p>{this.state.recipeName}</p>
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
      }
        
        </div>
      );
    
  }
}