import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../Fire/fire';
import signup from '../Signup/signup';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.loginWithFirebase = this.loginWithFirebase.bind(this);
    this.changingInput = this.changingInput.bind(this);
    this.signupWithFirebase = this.signupWithFirebase.bind(this);

    this.state = {
      email: '',
      password: ''
    };
  }

  changingInput(current) {
    this.setState({ [current.target.name]: current.target.value });
  }

  loginWithFirebase(current) {
    current.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });
  }

  signupWithFirebase(current){
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
       <h3>Login Page</h3>
       <form>
      <div class="form-group">
       <label for="exampleInputEmail1">Email address </label>
       <input value={this.state.email} onChange={this.changingInput} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
       <br/>
      </div>
       <div class="form-group">
      <label for="exampleInputPassword1">Password </label>
      <input value={this.state.password} onChange={this.changingInput} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
      <br/>
      </div>
      <button type="submit" onClick={this.loginWithFirebase} class="btn btn-primary">Login</button>



 </form>

 </div>
    //<button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
    );
  }
}
