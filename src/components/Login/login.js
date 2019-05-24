import React, { Component } from "react";
import ReactDOM from 'react-dom';
import fire from "../Fire/fire";
import signup from "../Signup/signup";
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, NavLink  } from 'reactstrap';
import Signup from "../Signup/signup";
import './Login.css';
import '../../styles/home.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.loginWithFirebase = this.loginWithFirebase.bind(this);
    this.changingInput = this.changingInput.bind(this);
    this.goToFirebase = this.goToFirebase.bind(this);

    this.state = {
      email: "",
      password: "",
      loggedInCheck: false
    };


  }

  changingInput(current) {
    this.setState({ [current.target.name]: current.target.value });
  }

  loginWithFirebase(current) {

    current.preventDefault();
    fire.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => { this.setState({loggedInCheck: true })
      }).catch(error => {
        this.setState({loggedInCheck: false })
        console.log(error);
        alert("Invalid username/password! Please try again.");
      });
  }

  goToFirebase(current) {
    let path = `/signup`;
    this.props.history.push(path);
  }

  goToSignUp(current){
    ReactDOM.render(<Signup/>, document.getElementById("signIn"));
  }

  render() {
    return (
      <div id="profileContainer">

      <div id="signIn" className="col-md-6">
        if ( {this.state.loggedInCheck == false }) {
          <div className="alartMessage" role="alart">Please Enter A Valid Email/Password</div>
          
        }
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
          <label>
            <input type="checkbox" defaultChecked="checked" name="remember" /> Remember me 
            <br></br>
          </label>
          
          {/* log In and signup buttons */}
          <button
            type="submit"
            onClick={this.loginWithFirebase}
            class="btn btn-primary"
            id="login"
          >
            Login
          </button>
          <Button onClick={this.goToSignUp} style={{marginLeft: '25px'}} className="btn btn-success" id="login">Signup</Button>

        
          <span className="psw" style={{marginRight:'10px'}}><a href="#">Forgot password?</a></span>
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
          <button
            type="submit"
            onClick={this.loginWithFirebase}
            class="btn btn-primary"
          >
            Login
          </button>
          <Button onClick={this.goToSignUp} style={{marginLeft: '25px'}} className="btn btn-success">Signup</Button>
</form>*/}
      </div>
      </div>
    );
  }
}

