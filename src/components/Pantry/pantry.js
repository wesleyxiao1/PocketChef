import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification, AuthUserContext, } from '../Session';
import { withFirebase } from '../Firebase';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Grid, Paper} from '@material-ui/core';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const PantryPage = () => (
  <div>
    <Typography variant="h3" component="h2" align="center"> My Pantry </Typography>
    <Typography variant="h6" component="h6" align="center">Welcome to Your Personalized Pantry!</Typography>

    <PantryItems />
  </div>
);

class PantryItemsBase extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    // const authUser= this.props.firebase.auth;
    // const uid = this.authUser.O;
    this.onRemovePantryItem=this.onRemovePantryItem.bind(this);
    this.state = {
      text: '',
      loading: false,
      localpantry: [],
      authUid: this.props.firebase.auth.O,
      tempshit: ''
    };
  }

  onEditPantryItem = (pantry_item, text) => {
    const { uid, ...pantryItemSnapshot } = pantry_item;

    this.props.firebase.pantry_item(pantry_item.uid).set({
      ...pantryItemSnapshot,
      text,
      // editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };
  onChangeText2 = event => {
    this.setState({ tempshit: event.target.value });
  };

  onRemovePantryItem(){
    var temparray=this.state.localpantry;
    for(var i=0;i<temparray.length;i++){
      if(temparray[i]==this.state.tempshit){
        temparray.splice(i,1);
        i--;
      }
    }
    this.setState({
      localpantry: temparray,
      tempshit:''
    });
    // console.log(this.state.localpantry);
    // this.setState({
    //   localpantry: newPantry
    // });
    // this.state.localpantry = newPantry;
    // console.log("new pantry");
    // console.log(this.state.localpantry);
    this.props.firebase.user(this.state.authUid).update({
      pantry_items: this.state.localpantry
    });
  };

  onCreatePantryItem = (event) => {

    if (!this.state.localpantry) {
      this.state.localpantry = [];
    }
    this.state.localpantry.push(this.state.text);
    // this.state.text = '';
    this.setState({
      text: ''
    });
    // console.log(this.state.localpantry);
    // console.log(this.props.firebase);
    this.props.firebase.user(this.state.authUid).update({
      pantry_items: this.state.localpantry
    });

    event.preventDefault();
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .user(this.state.authUid).on('value', snapshot => {
        // console.log(snapshot.child("pantry_items").val());
        this.setState({
          localpantry: snapshot.child("pantry_items").val()
        });
        this.state.localpantry = snapshot.child("pantry_items").val();
      });
  }

  componentWillUnmount() {
    this.props.firebase.pantry_items().off();
  }

  render() {
    // const { text, loading, localpantry } = this.state;
    // const { authUser, pantry_item, onRemovePantryItem } = this.props;
    // const authUser= this.props.firebase.auth
    return (
      // <AuthUserContext.Consumer>
      //   {authUser => (
      //     <div>
      //       {loading && <div>Loading ...</div>}

      //       {localpantry ? (
      //         <PantryList
      //           authUser={authUser}
      //           pantry_items={localpantry}
      //           onRemovePantryItem={this.onRemovePantryItem}
      //           onEditPantryItem={this.onEditPantryItem}
      //         />
      //       ) : (
      //           <div>There are no pantry items ...</div>
      //         )}
      //       <form onSubmit={event => this.onCreatePantryItem(event, authUser)}>
      //         <input
      //           type="text"
      //           value={text}
      //           onChange={this.onChangeText}
      //         />
      //         <button type="submit">Send</button>
      //       </form>

      //     </div>
      //   )}
      // </AuthUserContext.Consumer>
      // <AuthUserContext.Consumer>
      <MuiThemeProvider theme={theme}>
      <div id="main">
      <Container component="main" maxWidth="xs">
        {this.state.localpantry && (
          <h2>
            {this.state.localpantry.map((ingredient, index) =>
              <tr>
                <td>{ingredient}</td>
                {/* <button
                  type="button"
                  onClick={this.onRemovePantryItem()}
                >
                  Delete
              </button> */}
              </tr>
            )}
          </h2>
        )}
        </Container>
        <Grid container spacing={3}>
        <Grid item xs={3}></Grid>
          <Grid item xs={3} style={{textAlign: "center"}}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  id="ingredient-input"
                  label="Enter ingredient to add"

                  autoComplete="ingredient"
                  autoFocus
                  name="newIngredient"
                  value={this.state.text}
                  onChange={this.onChangeText}
                  style={{width: 250}}
              />
              <br></br>
              <Button
                type="submit"
                id="additem"
                onClick={this.onCreatePantryItem}
                variant="contained"
                color="primary"
                className={useStyles.submit}
              >
                Add to Pantry
              </Button>
          </Grid>
          <Grid item xs={3} style={{textAlign: "center"}}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  id="ingredient-removal"
                  label="Enter ingredient to delete"

                  autoComplete="ingredient2"
                  autoFocus
                  name="remval"
                  value={this.state.tempshit}
                  onChange={this.onChangeText2}
                  style={{width: 250}}
              />
              <br></br>
            <Button
                type="submit"
                id="removeitem"
                onClick={this.onRemovePantryItem}
                variant="contained"
                color="primary"
                className={useStyles.submit}
              >
                Remove from Pantry
              </Button>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        </div>
      </MuiThemeProvider>
      // </AuthUserContext.Consumer>  

    );
  }
}

// const PantryList = ({
//   authUser,
//   pantry_items,
//   onEditPantryItem,
//   onRemovePantryItem
// }) => (
//     <ul>
//       {pantry_items.map(pantry_item => (
//         <PantryItem
//           authUser={authUser}
//           key={pantry_item.uid}
//           pantry_item={pantry_item}
//           onRemovePantryItem={onRemovePantryItem}
//           onEditPantryItem={onEditPantryItem}
//         />
//       ))}
//     </ul>
//   );

// class PantryItem extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       editMode: false,
//       editText: this.props.pantry_item.text,
//     };
//   }

//   onToggleEditMode = () => {
//     this.setState(state => ({
//       editMode: !state.editMode,
//       editText: this.props.pantry_item.text,
//     }));
//   };

//   onSaveEditText = () => {
//     this.props.onEditPantryItem(this.props.pantry_item, this.state.editText);

//     this.setState({ editMode: false });
//   };

//   onChangeEditText = event => {
//     this.setState({ editText: event.target.value });
//   };

//   render() {
//     const { authUser, pantry_item, onRemovePantryItem } = this.props;
//     const { editMode, editText } = this.state;

//     return (
//       <li>
//         {authUser.uid === pantry_item.userId && (
//           <span>
//             {editMode ? (
//               <input
//                 type="text"
//                 value={editText}
//                 onChange={this.onChangeEditText}
//               />
//             ) : (
//                 <span>
//                   <strong>
//                     {pantry_item.user || pantry_item.user}
//                   </strong>{' '}
//                   {pantry_item.text} {pantry_item.editedAt && <span>(Edited)</span>}
//                 </span>
//               )}

//             {editMode ? (
//               <span>
//                 <button onClick={this.onSaveEditText}>Save</button>
//                 <button onClick={this.onToggleEditMode}>Reset</button>
//               </span>
//             ) : (
//                 <button onClick={this.onToggleEditMode}>Edit</button>
//               )}

//             {!editMode && (
//               <button
//                 type="button"
//                 onClick={() => onRemovePantryItem(pantry_item.uid)}
//               >
//                 Delete
//             </button>
//             )}
//           </span>
//         )}
//       </li>
//     );
//   }


// }

const PantryItems = withFirebase(PantryItemsBase);

const condition = authUser => !!authUser;

export default compose(

  withAuthorization(condition),
)(PantryPage);