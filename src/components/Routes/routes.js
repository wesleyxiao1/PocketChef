import React, { Component } from "react";
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
import Fire from '../Fire/fire'
import Recipes from "../Recipes/recipes";
import Favorites from "../Favorites/favorites";
import Signup from '../Signup/signup'
import Profile from "../Profile/profile";
import PrivateRoute from "./privateroutes"
import * as serviceWorker from '../../serviceWorker';
import Notfound from "../NotFound/NotFound";

class Routes extends Component {
    state = { loading: true, authenticated: false, user: null };
  
    componentWillMount() {
      Fire.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({
            authenticated: true,
            currentUser: user,
            loading: false
          });
        } else {
          this.setState({
            authenticated: false,
            currentUser: null,
            loading: false
          });
        }
      });
    }
  
    render() {
      const { authenticated, loading } = this.state;
  
      if (loading) {
        return <p>Loading..</p>;
      }
  
      return (
        <Switch>
            <PrivateRoute
              exact
              path="/"
              component={Home}
              authenticated={authenticated}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/list" component={List} />
            <Route path="/recipes" component={Recipes} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/profile" component={Profile} />
            <Route component={Notfound} />
        </Switch>
      );
    }
  }
  
  export default Routes;

