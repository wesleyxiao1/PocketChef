import Pantry from '../Pantry/pantry';
import List from '../List/list';
import Recipes from '../Recipes/recipes';
import Favorites from '../Favorites/favorites';
import Profile from '../Profile/profile';
import Home from '../Home/Home'
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
//navbar shared between every screen except login/signup

export default class Nav extends Component{


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
    goToHome(current){
        ReactDOM.render(<Home/>, document.getElementById("root"));
    }

    render(){
        return(
            <div>
            <ul className="navigationbar">
              <li><a onClick={this.goToHome} href="#home">Home</a></li>
              <li><a onClick={this.goToPantry} href="#pantry">Pantry</a></li>
              <li><a onClick={this.goToRecipes} href="#recipes">Recipes</a></li>
              <li><a onClick={this.goToFavorites} href="#favorites">Favorites</a></li>
              <li><a onClick={this.goToProfile} href="#contact">Profile</a></li>
              
              {/* login button */}
              <li style={{float: 'right'}}><button type="LogOut" onClick={this.logoutFirebase} class="LoginButton" id="login">LogOut</button></li>
            </ul>
          </div>
        )
    }


}