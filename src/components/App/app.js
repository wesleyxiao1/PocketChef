import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from '../Navbar/navbar';
import LandingPage from '../Landing/landing';
import SignUpPage from '../Signup/signup';
import SignInPage from '../Login/login';
import PasswordForgetPage from '../PasswordForget/passwordforget';
import Pantry from '../Pantry/pantry';
import HomePage from '../Home/Home';
import AccountPage from '../Account/account';
import AdminPage from '../Admin/admin';
import youtubePage from '../Youtube/youtube';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navbar />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.LOGIN} component={SignInPage} />
      <Route
        exact
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route
        exact
        path={ROUTES.YOUTUBE}
        component={youtubePage}
      />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} />
      <Route exact path={ROUTES.PANTRY} component={Pantry} />
    </div>
  </Router>
);

export default withAuthentication(App);