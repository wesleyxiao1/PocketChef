import React ,{ Component } from 'react'
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';

import { compose } from 'recompose';
import '../../styles/home.css';
import Pantry from '../Pantry/pantry';
import { withRouter } from 'react-router-dom';
import { withAuthorization, } from '../Session';
import { withFirebase } from '../Firebase';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import List from '@material-ui/core/List';
import { ListItem } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

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
      loading: false,
      localpantry: [],
      authUid: this.props.firebase.auth.O,
      pantryString: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  goToPantry(){
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
    var attempts=0;
    //while(this.state.data.length == 0 || attempts <= this.state.localpantry.length){
    this.setPantryString(attempts);
      fetch(`https://api.edamam.com/search?q=${this.state.pantryString}&app_id=4863ac07&app_key=6e58a756abe12ad9122ba4525c78f6b9&from=0&to=10`)
        .then(res => res.json())
        .then(json => this.setState({ data: json.hits }));
    attempts++;
    //}
  }

  setPantryString(attempts){
    var i;
    this.state.pantryString = this.state.localpantry.join('+');
    var plusSignes = (this.state.pantryString.split("+").length-1);
    for(i=attempts; plusSignes-i < plusSignes; i--){
      var pos = this.state.pantryString.lastIndexOf('+');
      this.state.pantryString = this.state.pantryString.substring(0,pos);
    }
    
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .user(this.state.authUid).on('value', snapshot => {
        console.log(snapshot.child("pantry_items").val());
        this.setState({
          localpantry: snapshot.child("pantry_items").val()
        });
        this.state.localpantry = snapshot.child("pantry_items").val();
        console.log(this.state.localpantry);
      });
    
    this.setPantryString();
  }

  componentWillUnmount() {
    if (!this.state.localpantry) {
      this.state.localpantry = [];
    }
    this.props.firebase.pantry_items().off();
  }
  
  /*handleClick() {
    fetch(`https://www.food2fork.com/api/search?key=65ab939ee06267a743713a544290c2a2&q=shredded%20chicken`)
      .then(res => res.json())
      .then(json => this.setState({ data: json.recipes }));
  }*/
    /*axios.get('https://api.edamam.com/search?q=chicken&app_id=4863ac07&app_key=6e58a756abe12ad9122ba4525c78f6b9&from=0&to=3&calories=59')
      //.then((data) => this.setState({results: data.hits[0].recipe.label}))
      */
  /*handleClick () {
    axios.get('https://www.food2fork.com/api/search?key=65ab939ee06267a743713a544290c2a2&q=shredded%20chicken')
      .then(response => this.setState({recipeName: response.data.recipes[0].title}))
  }*/
  render(){

    return(
      <MuiThemeProvider theme={theme}>
      <div>

        <FormControl variant="outlined" fullWidth className={useStyles.formControl}>
          <FormLabel component="legend" align="center" fullWidth>Filters</FormLabel>

            <Select

              input={<OutlinedInput  name="filter"  id="outlined-filter" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value=''>Filter1</MenuItem>
              <MenuItem value=''>Filter2</MenuItem>
              <MenuItem value=''>Filter3</MenuItem>
            </Select>
        </FormControl>

        <Button
          type="search"
          fullWidth
          variant="contained"
          color="primary"
          onClick={this.handleClick}
        >
            Search
        </Button>

        <GridList cellHeight={180} className={useStyles.gridList}>
        {this.state.data.map((item) => (
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
          {this.state.data.map((item) => {
                  return(
                    <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <img src={item.recipe.image}/>
                          </Grid>
                          <Grid item xs={6} key={item.recipe.label}>
                            <Link to={`/home/${item.recipe.label}`}>
                              {item.recipe.label}
                            </Link>   
                          </Grid>
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

/*const HomePageList = compose(
  withRouter,
)(HomePageBase);
*/
const HomePageList = withFirebase(HomePageBase);

const condition = authUser => !!authUser;

export default compose(

  withAuthorization(condition),
)(HomePage);
