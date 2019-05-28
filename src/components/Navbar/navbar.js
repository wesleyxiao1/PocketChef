import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SignOutButton from '../SignOut/signout';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

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
  
  <div>
    <AppBar position="static">
      <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="Menu">
            <MenuIcon />
      </IconButton>
      <Typography variant="h6">
            Pocket Chef
      </Typography>
      <Button color="inherit">
        <Link to={ROUTES.LANDING}>Landing</Link>
      </Button>
      <Button color="inherit">
        <Link to={ROUTES.HOME}>Home</Link>
      </Button>
      <Button color="inherit">
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </Button>
      <Button color="inherit">
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </Button>
      <Button color="inherit">
        <Link to={ROUTES.PANTRY}>Pantry</Link>
      </Button>
      <Button color="inherit">
        <SignOutButton />
      </Button>
      </Toolbar>
    </AppBar>
  </div>
);

const NavigationNonAuth = () => (
  <Toolbar>
    <IconButton edge="start" color="Primary" aria-label="Menu">
          <MenuIcon />
    </IconButton>
    <Typography variant="h6">
          Pocket Chef
    </Typography>
    <Button color="inherit">
        <Link to={ROUTES.LANDING}>Landing</Link>
    </Button>
    <Button color="inherit">
        <Link to={ROUTES.LOGIN}>Login</Link>
    </Button>
  </Toolbar>
);

export default Navigation;