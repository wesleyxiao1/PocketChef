import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {withRouter} from 'react-router-dom'
import { compose } from 'recompose';
import Bootstrap, { Container } from "react-bootstrap";
import Firebase from '../Firebase/firebase';
import { withFirebase } from "../Firebase";


	const logInPage = () => (
		<div>
			<h1>logIn</h1>
			<logInForm />
		</div>
	);

	const INITIAL_STATE = {
		email: '',
		password: '',
		error: null,
	};

	
class logInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .dologInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/home');
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          log In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}


const logInForm = compose(
	withRouter,
	withFirebase
)(logInFormBase);

export default logInPage;

export { logInForm };
/*
	componentWillUnmount(){
		this.firebaseRef.off();
	}

	pushToFirebase(event) {
		const {email, password} = this.state;
		event.preventDefault();
		this.firebaseRef.child(email).set({email, password});
		this.setState({email: '', password: ''});
	}

  validateForm() {
    	return this.state.email.length > 0 && this.state.password.length > 0;
 	}

  	handleChange = event => {
    	this.setState({
      		[event.target.id]: event.target.value
    	});
  	}

	handleSubmit = event => {
		event.preventDefault();
	}

	

	render() {

		const { email, password, error } = this.state;
		const isInvalid = password === '' || email === '';
		return (
				<form onSubmit={this.onSubmit}>
					<input
						name="email"
						value={email}
						onChange={this.onChange}
						type="text"
						placeholder="Email Address"
					/>
					<input
						name="password"
						value={password}
						onChange={this.onChange}
						type="password"
						placeholder="Password"
					/>
				<button disabled={isInvalid} type="submit">
					log In
				</button>

				{error && <p>{error.message}</p>}
			</form>
		);
	}
	
	/*<Form>
		  <Form.Group controlId="formBasicEmail">
		    <Form.Label>Email address</Form.Label>
		    <Form.Control type="email" placeholder="Enter email" />
		    
		  </Form.Group>

		  <Form.Group controlId="formBasicPassword">
		    <Form.Label>Password</Form.Label>
		    <Form.Control type="password" placeholder="Password" />
		  </Form.Group>
		  <Form.Group controlId="formBasicChecbox">
		    <Form.Check type="checkbox" label="Stay Logged In" />
		  </Form.Group>
		  <Button variant="primary" type="submit">
		    Login
		  </Button>
 

		</Form>
		);*/
	/*
  	render() {
		return (
      		<div className="Login">
        		<Form onSubmit={this.handleSubmit}>
          			<Form.Group controlId="email" bsSize="large">
          				<Form.label>Email</Form.label>
            			<Form.Control
              				autoFocus
              				type="email"
              				placeholder="enter email"
              				value={this.state.email}
              				onChange={this.handleChange}
            			/>
          			</Form.Group>
          			<Form.Group controlId="password" bsSize="large">
          				<Form.label>Password</Form.label>
            			<Form.Control
              				value={this.state.password}
              				onChange={this.handleChange}
              				type="password"
              				placeholder="password"
            			/>
          			</Form.Group>
			        <Button
			          block
			          bsSize="large"
			          disabled={!this.validateForm()}
			          type="submit"
			        >
            			Login
          			</Button>
        		</Form>
      		</div>
    	);
  	}*/