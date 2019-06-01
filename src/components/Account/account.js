import React from 'react';

import { AuthUserContext } from '../Session';
import { PasswordForgetForm } from '../PasswordForget/passwordforget';
import PasswordChangeForm from '../PasswordChange/passwordChange';
import { withAuthorization } from '../Session';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import Container from '@material-ui/core/Container';
import './account.css';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const AccountPage = () => (
  <MuiThemeProvider theme={theme}>
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <Container component="main" maxWidth="xs">
          <h1 id="accountPass">Forgot Password? </h1>
          <h3 id="accountPass">Enter email down below</h3>
          <PasswordForgetForm />
          <br/>
          <br/>
          <h1 id="accountPass">Reset Password? </h1>
          <h3 id="accountPass">Enter new password down below</h3>
          <PasswordChangeForm />
        </Container>
      </div>
    )}
  </AuthUserContext.Consumer>
  </MuiThemeProvider>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);