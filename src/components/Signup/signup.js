import React, { Component } from "react";
import fire from "../Fire/fire";
import signup from "../Signup/signup";
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, NavLink  } from 'reactstrap';


export default class Signup extends Component {

    constructor(props){
        super(props);
        this.changingInput = this.changingInput.bind(this);
        this.signupWithFirebase = this.signupWithFirebase.bind(this);
        
        this.state = {
            email: '',
            password: ''
        }
    }

    changingInput(current) {
        this.setState({ [current.target.name]: current.target.value });
    }

    signupWithFirebase(current) {
        current.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        }).then((u)=>{console.log(u)})
        .catch((error) => {
            console.log(error);
          })
    }



    render() {
        return (
                <div className="col-md-6">
                    <h1 className="app-name">Pocket Chef</h1>


        <form className="modal-content animate" action="/action_page.php">
        <div className="imgcontainer">
          <img src={ require('../../images/corgi.png') } alt="Avatar" className="avatar" />
        </div>
        <div className="container">
          {/* input for username and password */}
          <label htmlFor="uname"><b>Username</b></label>
          <input type="email" placeholder="Enter Username" name="email" id="login-input" value={this.state.email} onChange={this.changingInput} required />
          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" id="login-input" value={this.state.password} onChange={this.changingInput} required />
          
          {/* signup button */}
          <button onClick={this.signupWithFirebase} style={{marginLeft: '25px'}} className="btn btn-success" id="login">Signup</button>

        </div>
      </form>
{/*
                    <form>
                    <div class="form-group">
                    <label for="InputEmail">Email address </label>
                    <input
                        value={this.state.email}
                        onChange={this.changingInput}
                        type="email"
                        name="email"
                        class="form-control"
                        id="InputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                    />
                    <br />
                    </div>
                    <div class="form-group">
                    <label for="InputPassword">Password </label>
                    <input
                        value={this.state.password}
                        onChange={this.changingInput}
                        type="password"
                        name="password"
                        class="form-control"
                        id="InputPassword"
                        placeholder="Password"
                    />
                    <br />
                    </div>
                    <button onClick={this.signupWithFirebase} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
</form>*/}
            </div>
        )
    }
}