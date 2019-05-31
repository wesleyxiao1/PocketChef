import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core' 
import blue from '@material-ui/core/colors/blue'
import * as ROUTES from '../../constants/routes';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const SignOutButton = ({ firebase }) => (
  <MuiThemeProvider theme={theme}>
  <Button color="inherit" onClick={firebase.doSignOut} component={Link} to={ROUTES.LOGIN} >
    Sign Out
  </Button>
  </MuiThemeProvider>
);

export default withFirebase(SignOutButton);