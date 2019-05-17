import React, { Component } from 'react'
import fire from '../Fire/fire';

export default class Home extends Component {

  constructor(props){
    super(props);
    this.logoutFirebase = this.logoutFirebase.bind(this);
  }


  logoutFirebase()
  {
      fire.auth().signOut();
  }
  render() {
    return (
      <div className="Home">
        <h1>You are Home</h1>

        <div className="form-group">
            <button type="LogOut" onClick={this.logoutFirebase} class="LoginButton">LogOut</button>
          </div>
      </div>
    )
  }
}