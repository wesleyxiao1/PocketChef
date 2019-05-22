import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import ReactDOM from 'react-dom'
import Login from '../Login/login';
import Navbar from '../Navbar/navbar'
import Home from '../Home/Home';
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Routes from '../Routes/routes'
import fire from '../Fire/fire';
import routes from "../Routes/routes";
import './app.css'

export default class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            user:{},
        }
    }

    componentDidMount(){
        this.authenticatorListener();
    }

    authenticatorListener(){
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({user});
                localStorage.setItem('user',user.uid);
            }
            else{
                this.setState( {user: null});
                localStorage.removeItem('user');
            }
        })
    }

    render() {
        return (
                <div className="App">
                    <Header/>
                    <Routes></Routes>
                </div>
        )
    }
}

// initialize rotues and navi links
// const initRoutes = () => (
//   <Router>
//     <div>
//       <Header />
//       {routes}

//     </div>
//   </Router>
// );

// const initializedRoutes = initRoutes();
// ReactDOM.render(
//   initializedRoutes, 
//   document.getElementById("root")
// );



// return (
//     <Router>
//         <div className="App">
//             { this.state.user ? (<Home/>) : (<Login/>) }
//         </div>
//     </Router>
// )