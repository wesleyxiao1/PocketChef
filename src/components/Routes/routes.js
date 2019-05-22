import React from "react";
import ReactDOM from "react-dom";
import "../../index.css";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import App from "../App/app";
import Pantry from "../Pantry/pantry";
import List from "../List/list";
import Home from "../Home/Home"
import Login from "../Login/login"
import Recipes from "../Recipes/recipes";
import Favorites from "../Favorites/favorites";
import Profile from "../Profile/profile";
import * as serviceWorker from '../../serviceWorker';
import Notfound from "../NotFound/NotFound";

const routes =  (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/list" component={List} />
                <Route path="/recipes" component={Recipes} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/profile" component={Profile} />
                <Route component={Notfound} />
            </Switch>
);

//ReactDOM.render(Routes, document.getElementById("root"));

export default routes
//serviceWorker.unregister();

