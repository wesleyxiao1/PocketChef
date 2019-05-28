import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';

import { compose } from 'recompose';
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Nav from '../Navbar/navbar';
import '../../styles/home.css';
import Pantry from '../Pantry/pantry';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { withAuthorization } from '../Session';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Switch from '@material-ui/core/Switch';
import yellow from '@material-ui/core/colors/yellow';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import * as ROUTES from '../../constants/routes';
import { ListItemText, ListItem } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from './popup';

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
  media: {
    height: 20,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
  },
}));

class HomePageBase extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      videoData: [],
      showPopup: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  goToPantry(current){
    ReactDOM.render(<Pantry/>, document.getElementById("root"));
  }

  /*handleClick() {
    (async () => {
      const recipes = await getRecipes()
      console.log(recipes.data)
    })()}
  */

  /*handleClick() {
    fetch(`https://www.food2fork.com/api/search?key=65ab939ee06267a743713a544290c2a2&q=shredded%20chicken`)
      .then(res => res.json())
      .then(json => this.setState({ data: json.hits }));
  }*/

  handleClick() {
    fetch(`https://api.edamam.com/search?q=chicken&app_id=4863ac07&app_key=6e58a756abe12ad9122ba4525c78f6b9&from=0&to=10&calories=59`)
      .then(res => res.json())
      .then(json => this.setState({ data: json.hits }));
  }
  
  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
  }

  /*handleClick() {
    fetch(`https://www.food2fork.com/api/search?key=65ab939ee06267a743713a544290c2a2&q=shredded%20chicken`)
      .then(res => res.json())
      .then(json => this.setState({ data: json.recipes }));
  }*/

  onTileTouch(name){
    //display the youtube API
  }
  
  addToFavourites(uri){
    //add the URI to the users favorites

  }

    /*axios.get('https://api.edamam.com/search?q=chicken&app_id=4863ac07&app_key=6e58a756abe12ad9122ba4525c78f6b9&from=0&to=3&calories=59')
      //.then((data) => this.setState({results: data.hits[0].recipe.label}))
      */
  /*handleClick () {
    axios.get('https://www.food2fork.com/api/search?key=65ab939ee06267a743713a544290c2a2&q=shredded%20chicken')
      .then(response => this.setState({recipeName: response.data.recipes[0].title}))
  }*/
  render(){


    return(
      <div>
        <MenuItem
          primaryText="Profile"
        />
        <Button
          type="search"
          fullWidth
          variant="contained"
          color="primary"
          onClick={this.handleClick}
        >
            Search
        </Button>
        <List>
          {this.state.data.map((item) => {
                  return(
                    <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <img src={item.recipe.image} onClick={this.togglePopup.bind(this)}/>
                          </Grid>
                          <Grid item xs={6}>
                            {item.recipe.label}
                          </Grid>
                        </Grid>
                        {this.state.showPopup ?  
                        <Popup  
                          text={item.recipe.label}  
                          closePopup={this.togglePopup.bind(this)}  
                        />
                        :null
                        }  
                    </ListItem>
                  );
                })
                }
        </List>
      </div>
    )
  }

}

const HomePage = () => (
  <Container component="main" maxWidth="xs">
  <CssBaseline />
    <div className={useStyles.paper}>
      <HomePageList/>
    </div>
  </Container>
);

const HomePageList = compose(
  withRouter,
)(HomePageBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
