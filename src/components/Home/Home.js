import React ,{ Component } from 'react'
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';

import { compose } from 'recompose';
import '../../styles/home.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Pantry from '../Pantry/pantry';
import Typography from '@material-ui/core/Typography';
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
import { ListItem, ListItemText } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

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
    component: "img",
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    height: 0
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
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
      dataLength: 0,
      videoData: [],
      loading: false,
      localpantry: [],
      authUid: this.props.firebase.auth.O,
      pantryString: '',
      filters: '',
      setAnchorEl: null,
      anchorEl: null
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setFiberFilter = this.setFiberFilter.bind(this);
    this.setProteinFilter = this.setProteinFilter.bind(this);
    this.setGlutenFilter = this.setGlutenFilter.bind(this);
    this.setPorkFilter = this.setPorkFilter.bind(this);
    this.setKetoFilter = this.setKetoFilter.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
  }

  handleClick(event) {
    this.state.setAnchorEl = event.currentTarget;
  }
  
  handleClose() {
    this.state.setAnchorEl = null;
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

  handleButtonClick = async() => {
  var attempts=0;
  var dataLength = 0;
  while((dataLength == 0)){
    this.setPantryString(attempts);
    dataLength = await fetch(`https://api.edamam.com/search?q=${this.state.pantryString}&app_id=87c18f5b&app_key=1ecd65def7f69302996bd63e58d89c50&from=0&to=40${this.state.filters}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ data: json.hits });
        return json.hits.length;
      })
      .then(attempts++);
    }
  }
  /*handleClick() {
    fetch(`http://www.recipepuppy.com/api/?i=${this.state.pantryString}`)
        .then(res => res.json())
        .then(json => this.setState({ data: json.hits }));
  }*/

  setPantryString(attempts){
    var i;
    if(this.state.localpantry){
      this.state.pantryString = this.state.localpantry.join('+');
      var plusSignes = (this.state.pantryString.split("+").length-1);
      for(i=attempts; plusSignes-i < plusSignes; i--){
        var pos = this.state.pantryString.lastIndexOf('+');
        this.state.pantryString = this.state.pantryString.substring(0,pos);
      }
    }
  }
  setKetoFilter(){
    this.state.filters = '&health=keto-friendly';
    console.log(this.state.filters);
  }
  setGlutenFilter(){
    this.state.filters = '&health=gluten-free';
    console.log(this.state.filters);
  }
  setPorkFilter(){
    this.state.filters = '&health=pork-free';
    console.log(this.state.filters);
  }
  setProteinFilter(){
    this.state.filters = '&diet=high-protein';
    console.log(this.state.filters);
  }
  setFiberFilter(){
    this.state.filters = '&diet=high-fiber';
    console.log(this.state.filters);
  }

  resetFilters(){
    this.state.filters= '';
    console.log(this.state.filters);
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
    
    //this.setPantryString();
  }

  componentWillUnmount() {
    if (!this.state.localpantry) {
      this.state.localpantry = [];
    }
    this.props.firebase.pantry_items().off();
  }

  render(){
    return(
      
      <MuiThemeProvider theme={theme}>
      <div>
        <Container maxWidth="md">
        {this.setPantryString()}
        <PopupState variant="popover" popupId="demo-popup-menu">
          {popupState => (
            <React.Fragment>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                Open Menu
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Close</MenuItem>
                <StyledMenuItem onClick={this.resetFilters}>
                  <ListItemText primary = "None"/>
                </StyledMenuItem>
                <StyledMenuItem onClick={this.setKetoFilter}>
                  <ListItemText primary = "Keto Friendly"/>
                </StyledMenuItem>
                <StyledMenuItem onClick={this.setPorkFilter}>
                  <ListItemText primary = "Pork Free"/>
                </StyledMenuItem>
                <StyledMenuItem onClick={this.setGlutenFilter}>
                  <ListItemText primary = "Gluten Free"/>
                </StyledMenuItem>
                <StyledMenuItem onClick={this.setFiberFilter}>
                  <ListItemText primary = "High Fiber"/>
                </StyledMenuItem>
                <StyledMenuItem onClick={this.setProteinFilter}>
                  <ListItemText primary = "High Protein"/>
                </StyledMenuItem>
              </Menu>
              </Typography>
            </React.Fragment>
          )}
          </PopupState>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            <Button
            type="search"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleButtonClick}
          >
              Search
          </Button>
          </Typography>
        </Container>
        {/*<List>
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
              </List>*/}
      </div>
      <React.Fragment>
        <CssBaseline />
        <main>
          <Container className={useStyles.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {this.state.data.map(card => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={useStyles.card}> 
                    <CardMedia
                      style = {{ height: 20, paddingTop: '56%'}}
                      image={card.recipe.image}
                    />
                    <CardContent className={useStyles.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.recipe.label}
                      </Typography>
                    </CardContent>
                    <CardActions>
                    <Button component={Link} to={`/home/${card.recipe.label}`} color="primary" className={useStyles.button}>
                        Related Videos
                    </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* End footer */}
      </React.Fragment>
      </MuiThemeProvider>
    )
  }

}

const HomePage = () => (
  <Container component="main">
  <CssBaseline />
    <div>
      <HomePageList/>
    </div>
  </Container>
  
);

const HomePageList = withFirebase(HomePageBase);

const condition = authUser => !!authUser;

export default compose(

  withAuthorization(condition),
)(HomePage);

/*<div>
      <Button
        aria-owns={this.anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={this.handleClick}
      >
        Open Menu
      </Button>
      <StyledMenu
        id="simple-menu"
        anchorEl={this.anchorEl}
        open={Boolean(this.anchorEl)}
        onClose={this.handleClose()}
      >
          <StyledMenuItem onClick={this.resetFilters}>
            <ListItemText primary = "None"/>
          </StyledMenuItem>
          <StyledMenuItem onClick={this.setKetoFilter}>
            <ListItemText primary = "Keto Friendly"/>
          </StyledMenuItem>
          <StyledMenuItem onClick={this.setPorkFilter}>
            <ListItemText primary = "Pork Free"/>
          </StyledMenuItem>
          <StyledMenuItem onClick={this.setGlutenFilter}>
            <ListItemText primary = "Gluten Free"/>
          </StyledMenuItem>
          <StyledMenuItem onClick={this.setFiberFilter}>
            <ListItemText primary = "High Fiber"/>
          </StyledMenuItem>
          <StyledMenuItem onClick={this.setProteinFilterxs}>
            <ListItemText primary = "High Protein"/>
          </StyledMenuItem>
        </StyledMenu>
        </div>*/

{/*<GridList cellHeight={180} className={useStyles.gridList}>
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
            </GridList>*/}