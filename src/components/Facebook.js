import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'

export default class Facebook extends Component {
    state ={
        isLooggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    }

    responseFacebook = response =>{ 
        this.setState({
            isLooggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.picture.data.url

        });
    };
    componentClicked = () =>{
        console.log("clicked");
    };

    render() {
        let fbInfo; // variable that stores the content of the user
        
        if ( this.state.isLooggedIn )
        {
            
        }else{
            fbInfo = (
                <FacebookLogin
                appId="2344668202524705"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}/>);
        }

        return (
        <div>{fbInfo}</div>
        )
    }
}
