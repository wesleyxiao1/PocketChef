import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core' 
import {blue, grey} from '@material-ui/core/colors/'
import SignOutButton from '../SignOut/signout';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },

  button: {
    margin: theme.spacing(5),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: grey,
  },
});

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  
  <MuiThemeProvider theme={theme}>
    <AppBar position="static">
      <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="Menu">
            <MenuIcon />
      </IconButton>
      <Typography variant="h5" marginRight="theme.spacing(10)">
            Pocket Chef
      </Typography>
      <Button component={Link} to={ROUTES.LANDING} color="inherit" className={useStyles.button}>
        Landing
      </Button>
      <Button component={Link} to={ROUTES.HOME} color="inherit" className={useStyles.button}>
        Home
      </Button>
      <Button component={Link} to={ROUTES.ACCOUNT} color="inherit" className={useStyles.button}>
        Account
      </Button>
      <Button component={Link} to={ROUTES.ADMIN} color="inherit" className={useStyles.button}>
        Admin
      </Button>
      <Button component={Link} to={ROUTES.PANTRY} color="inherit" className={useStyles.button}>
        Pantry
      </Button>
      <Typography style={{flex: 1}}></Typography>
      <Button component={Link} to={ROUTES.LANDING} color="inherit" className={useStyles.button}>
        <SignOutButton />
      </Button>
      </Toolbar>
    </AppBar>
  </MuiThemeProvider>
);


const NavigationNonAuth = () => (
  <MuiThemeProvider theme={theme}>
  <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="Menu">
          <MenuIcon />
    </IconButton>
    <Typography variant="h5">
          Pocket Chef
    </Typography>
    <Button component={Link} to={ROUTES.LANDING} color="inherit" className={useStyles.button}>
        Landing
    </Button>
    <Typography style={{flex: 1}}></Typography>
    <Button component={Link} to={ROUTES.LOGIN} color="inherit"  className={useStyles.button} >
        Login
    </Button>
  </Toolbar>
  </AppBar>
  </MuiThemeProvider>
);

export default Navigation;