import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
  changedEmail: false,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.setState({ changedEmail: true})
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
    const { passwordOne, passwordTwo, error,changedEmail } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="New Password"
          name="passwordOne"
          onChange={this.onChange}
          autoComplete="passwordOne"
          autoFocus
          type="password"
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Confirm New Password"
          name="passwordTwo"
          onChange={this.onChange}
          autoComplete="passwordTwo"
          autoFocus
          type="password"
        />
        {changedEmail?<p>New Password has been Set.</p>: null}
        <button disabled={isInvalid} type="submit">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={useStyles.submit}
          disabled={isInvalid} 
        >
          Reset My Password
        </Button>
        {error && <p>{error.message}</p>}
        </button>
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);