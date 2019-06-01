import React from 'react';

import { AuthUserContext } from '../Session';
import { PasswordForgetForm } from '../PasswordForget/passwordforget';
import PasswordChangeForm from '../PasswordChange/passwordChange';
import { withAuthorization } from '../Session';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import Container from '@material-ui/core/Container';

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
        <h2>Forgot Password? Enter email down below</h2>
        <PasswordForgetForm />
        <br/>
        <br/>
        <h2>Reset Password? Enter new password down below</h2>
        <PasswordChangeForm />
        </Container>
      </div>
    )}
  </AuthUserContext.Consumer>
  </MuiThemeProvider>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);