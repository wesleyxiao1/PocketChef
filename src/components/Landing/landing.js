import React, { Component } from 'react'
import { Grid, Cell} from 'react-mdl'
import './landing.css'

class Landing extends React.Component {
  render() {
    return (
      <div className="Landing-Style" style={{width: '100%', margin: 'auto'}}>
        <div className="Header-PocketChef">
          <h1 className="testing">Pocket Chef</h1>
          <img src={require('../../images/poketche.JPG')} alt="pocket-Chef-Image" className="pocket-Chef-Image"/>
        </div>


        <div className="HowtoPocketChef">
          <h2>How to Pocket Chef</h2>
          <p>Three simples Steps</p>
        </div>

        <div className="howToPocketChef">
          <div className="Add" >
            <h2>Add ingredients</h2>
            <img src={require('../../images/icons8-add-64.png')}/>
          </div>
          
          <div className="Search" > 
            <h2>Search Recipes</h2>
            <img src={require('../../images/search.png')}/>
          </div>

          <div className="Cook" >
            <h2>Cook</h2>
            <img src={require('../../images/cook.png')}/>
          </div>

        </div>
        
      </div>


    );
  }
}
export default Landing