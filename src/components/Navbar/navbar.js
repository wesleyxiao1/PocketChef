import Pantry from '../Pantry/pantry';
import List from '../List/list';
import Recipes from '../Recipes/recipes';
import Favorites from '../Favorites/favorites';
import Profile from '../Profile/profile';
import ReactDOM from 'react-dom';
import routes from "../Routes/routes";
import React, {Component} from 'react';
import {
    Route,
    Link,
    BrowserRouter as Router,
    Switch
  } from "react-router-dom";
//navbar shared between every screen except login/signup

class Nav extends Component{

    render = () => (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/pantry">Pantry</Link>
                <Link to="/list">List</Link>
                <Link to="/recipes">Recipes</Link>
                <Link to="/favorites">Favorites!!</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/login">Login</Link>                
            </nav>
            <div>
                {routes}
            </div>
        </div>
    );
}
export default Nav


