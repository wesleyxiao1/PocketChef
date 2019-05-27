import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import fire from '../Fire/fire';
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Nav from '../Navbar/navbar';
import '../../styles/home.css';
import axios from 'axios';
import Pantry from '../Pantry/pantry';

export default class Home extends Component {

  constructor(props){
    super(props);
    this.logoutFirebase = this.logoutFirebase.bind(this);
    this.state = {
      data: []
    };
    this.handleClick = this.handleClick.bind(this);
  }
  goToPantry(current){
    ReactDOM.render(<Pantry/>, document.getElementById("root"));
  }
  logoutFirebase()
  {
      fire.auth().signOut();
  }

  /*getRecipes = async () =>{
    return await axios({url: 'https://api.edamam.com/search?q=chicken&app_id=4863ac07&app_key=6e58a756abe12ad9122ba4525c78f6b9&from=0&to=3&calories=59'})
  }*/

  /*handleClick() {
    (async () => {
      const recipes = await getRecipes()
      console.log(recipes.data)
    })()}
  */

  /*handleClick() {
    fetch(`https://www.food2fork.com/api/search?key=65ab939ee06267a743713a544290c2a2&q=shredded%20chicken`)
      .then(res => res.json())
      .then(json => this.setState({ data: json.hits }));
  }*/

  handleClick() {
    fetch(`https://api.edamam.com/search?q=chicken&app_id=4863ac07&app_key=6e58a756abe12ad9122ba4525c78f6b9&from=0&to=3&calories=59`)
      .then(res => res.json())
      .then(json => this.setState({ data: json.hits }));
  }

    /*axios.get('https://api.edamam.com/search?q=chicken&app_id=4863ac07&app_key=6e58a756abe12ad9122ba4525c78f6b9&from=0&to=3&calories=59')
      //.then((data) => this.setState({results: data.hits[0].recipe.label}))
      */
  /*handleClick () {
    axios.get('https://www.food2fork.com/api/search?key=65ab939ee06267a743713a544290c2a2&q=shredded%20chicken')
      .then(response => this.setState({recipeName: response.data.recipes[0].title}))
  }*/

  render() {
    return (
      <div className="Home">
        <h2>Home</h2>
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
          <div className='button__container'>
            <button className='button' onClick={this.handleClick}>
              Search
            </button>
          </div>
          <div className="searchResults">
            <ul className="results">
              {/*this.state.data.recipes.map(el => (*/}              
              {this.state.data.map(function(item, i){
                  return <li key={i}>
                    <div className="entire-div">
                      <a>{item.recipe.label}</a>
                      <div className="left-div" title="Description">
                        <ul className="recipe-description">
                          <li> {item.recipe.source}</li>
                          {item.recipe.ingredients.map(function(ingredient, i){
                            return(
                              <li>
                                {ingredient.text}
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                      <div className="right-div">
                        <img src={item.recipe.image}></img>
                      </div>
                    </div>
                  </li>
              })
              }
            </ul>
          </div>
        </div>
      ); 
    } 
  }

  //ReactDOM.render(<Home />, document.getElementById("home"));