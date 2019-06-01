import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core' 
import blue from '@material-ui/core/colors/blue'

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

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const PasswordForgetPage = () => (
  <Container component="main" maxWidth="xs">
  <CssBaseline />
  <MuiThemeProvider theme={theme}>
  <div align="center">
    <Avatar className={useStyles.avatar}>
      <LockOutlinedIcon />
    </Avatar>
    </div>
    <Typography component="h1" variant="h5" align="center">
      Password Recorvey
    </Typography>
    <PasswordForgetForm />
  </MuiThemeProvider>
  </Container>
);

const INITIAL_STATE = {
  email: '',
  error: null,
  emailSentConfirmations: false,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE};
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.setState({emailSentConfirmations: true})
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
    const { email, error,emailSentConfirmations } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          autoComplete="email"
          autoFocus
        />
        {emailSentConfirmations?<p>Reset link sent to your email!</p>: null}
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
        
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };