import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import App from "./components/App/app";
import Profile from "./components/Profile/profile";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import * as serviceWorker from './serviceWorker';
import Notfound from "./components/NotFound/NotFound";

const routing = (
  <Router>
    <div>
      <ul>
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/profile">
            Profile
          </NavLink>
        </li>
        <li>
            <NavLink activeClassName="active" to="/login">
                Login
            </NavLink>
        </li>
        <li>
            <NavLink activeClassName="active" to="/signup">
                Sign up
            </NavLink>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));


serviceWorker.unregister();