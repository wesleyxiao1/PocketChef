import Pantry from '../Pantry/pantry';
import List from '../List/list';
import Recipes from '../Recipes/recipes';
import Favorites from '../Favorites/favorites';
import Profile from '../Profile/profile';
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
    render(){
        return(
            <nav>
                <div className="navWide">
                    <div className="wideDiv">
                        <a onClick={this.goToPantry}>Pantry</a>
                        <a onClick={this.goToList}>List</a>
                        <a onClick={this.goToRecipes}>Recipes</a>
                        <a onClick={this.goToFavorites}>Favorites</a>
                        <a onClick={this.goToProfile}>Profile</a>
                    </div>

                </div>
            </nav>
        )
    }


}