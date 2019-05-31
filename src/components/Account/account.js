import React from 'react';

import { AuthUserContext } from '../Session';
import { PasswordForgetForm } from '../PasswordForget/passwordforget';
import PasswordChangeForm from '../PasswordChange/passwordChange';
import { withAuthorization } from '../Session';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <h2>Forgot Password? Enter email down below</h2>
        <PasswordForgetForm />
        <br/>
        <br/>
        <h2>Reset Password? Enter new password down below</h2>
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);