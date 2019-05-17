import React, { Component } from 'react'
import db from '../Fire/fire'

export default class Signup extends Component {

    constructor(props){
    super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    Signup(current){
        current.preventDefault();
        db.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=> {
        }).catch((error) => {
        console.log(error);
    });
    }

    render() {
        return (
        <div>Hello</div>
        )
    }
}