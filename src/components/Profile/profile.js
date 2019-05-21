import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fire from '../Fire/fire';
import Nav from '../Navbar/navbar';
import '../../styles/profile.css';

export default class Profile extends Component {

  constructor(props){
    super(props);

  }

  render() {
    return (

        <div id="profileContainer">
            <div id="userNameArea">
            <h1 className="userName">User Name</h1>
            </div>
                <div id="profilePicArea">
                <img className="profilePic" src={ require('../../images/corgi.png') } height="300px" width="300px" />
            </div>
            <ul className="profileBar">
                <li><a id="prof" href="#settings">Settings</a></li>
                <li><a id="prof" href="#contact">Contact Support</a></li>
                <li><a id="prof" href="#logout" style={{color:'red'}}>Logout</a></li>
            </ul>
        </div>
    )
}
}