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

        <br/>
        <br/>
        <div className="HowtoPocketChef">
          <h1>How to Pocket Chef</h1>
          <h2>Three simples Steps</h2>
        </div>
        <br/>
        <br/>
        <div className="howToPocketChef">
          <div className="Add" >
            <h2>Add ingredients</h2>
            <img src={require('../../images/Add-item-icon.png')} style={{width: 600, height: 600}}/>
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