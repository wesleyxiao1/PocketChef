import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Login from '../Login/login';
import Home from '../Home/Home';
import fire from '../Fire/fire';
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
            }
            else{
                this.setState( {user: null});
            }
        })
    }

    render() {
        return (
        // If the user is Loged in, go Home,
        // otherwise go to Login page
        <div className="App">
            { this.state.user ? (<Home/>) : (<Login/>) }
        </div>
        )
    }
}