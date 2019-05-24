import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import App from "./components/App/app";
//import * as serviceWorker from './serviceWorker';

/**
 * Entry point to our application. For now we just need the App componenet. As we grow we will also implement our react redux stores here
 */

ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById('root')
);
