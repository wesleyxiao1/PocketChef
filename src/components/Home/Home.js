import React ,{ Component, useState, useEffect } from 'react'
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
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import Menu from '@material-ui/core/Menu';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ListSubheader from '@material-ui/core/ListSubheader';

import FiltersGroup from '../Filters/filters.js'

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

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },

}));

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});


class HomePageBase extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      videoData: [],
      showPopup: false,
      showFilters: false,
      highProteinFilter: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.handleApplyClick = this.handleApplyClick.bind(this)
  }
  
  goToPantry(current){
    ReactDOM.render(<Pantry/>, document.getElementById("root"));
  }

  handleClick() {
    fetch(`https://api.edamam.com/search?q=chicken&app_id=4863ac07&app_key=6e58a756abe12ad9122ba4525c78f6b9&from=0&to=10&calories=59`)
      .then(res => res.json())
      .then(json => this.setState({ data: json.hits }));
    console.log("after search clicked")
  }
  
  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
  }

  onTileTouch(name){
    //display the youtube API
  }
  
  addToFavourites(uri){
    //add the URI to the users favorites
  }

  handleFilterClick() {
    console.log("filter button clicked")
    console.log(this.state.showFilters)
    this.setState({
      showFilters: true,
    });
  }

  // need to press apply filter after selecting fitler in order 
  // to edit filter again
  handleApplyClick() {
    console.log("filter apply button clicked")
    this.setState({
      showFilters: false,
    });
    this.handleClick()
  }

  homeCallback = (dataFromFilters) => {
    console.log("callback: " + dataFromFilters)
    this.highProteinFilter = dataFromFilters
  }

  filterRecipe(item) {
    if (item.recipe.dietLabels.indexOf("high-protein") >= 0) {
      return (
        <div>
          <Grid item xs={6}>
            <img src={item.recipe.image}/>
          </Grid>
          <Grid item xs={6} key={item.recipe.label}>
            <Link to={`/home/${item.recipe.label}`}>
              {item.recipe.label}
            </Link>   
          </Grid>
        </div>
      );
    } else {
      return <div />
    }
  }

  render(){
    console.log("In Home render");
    return(
      <MuiThemeProvider theme={theme}>
        <div>
          <Button
            type="search"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleFilterClick}> select filters </Button>
            {this.state.showFilters ? 
              <FiltersGroup callback={this.homeCallback} highProtein={this.highProteinFilter}/> : <div />
            }

          <Button
            type="search"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleApplyClick}> apply filters </Button>

          <Button
            type="search"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleClick}> Search </Button>

          <GridList cellHeight={180} className={useStyles.gridList}>
            {this.state.data.map((item,i) => (
              <GridListTile key={item.recipe.image}>
                <img src={item.recipe.image} alt={item.recipe.label} />
                <GridListTileBar
                  title={item.recipe.label}
                  actionIcon={
                    <IconButton className={useStyles.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))} 
          </GridList>

          <List>
            {this.state.data.map((item, i) => {
              return(
                <ListItem>
                    <Grid container>
                      {this.filterRecipe(item)}
                    </Grid> 
                </ListItem>
              );
            })
            }
          </List>


        </div>
      </MuiThemeProvider>
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
