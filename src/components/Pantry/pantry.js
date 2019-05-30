import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification, AuthUserContext, } from '../Session';
import { withFirebase } from '../Firebase';

const PantryPage = () => (
  <div>
    <h1>Pantry Page</h1>
    <p>The Pantry Page is accessible by every signed in user.</p>

    <PantryItems />
  </div>
);

class PantryItemsBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      plzwork: [],
    };
  }

  onEditPantryItem = (pantry_item, text) => {
    const { uid, ...pantryItemSnapshot } = pantry_item;

    this.props.firebase.pantry_item(pantry_item.uid).set({
      ...pantryItemSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onRemovePantryItem = uid => {
    this.props.firebase.pantry_item(uid).remove();
  };

  onCreatePantryItem = (event, authUser) => {
    this.setState({
      plzwork: this.state.plzwork.concat(this.state.text),

     });
    console.log(this.state.plzwork);
   this.props.firebase.pantry_items(authUser.uid).update({
      // ingredient: this.state.text,
      pantry_items: this.state.plzwork
    });

     this.setState({ text: '' });

    event.preventDefault();
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .pantry_items()
      .orderByChild('createdAt')
      .on('value', snapshot => {
      const pantryItemObject = snapshot.val();
      if (pantryItemObject) {
        const pantryList = Object.keys(pantryItemObject).map(key => ({
          ...pantryItemObject[key],
          uid: key,
        }));
        // convert pantry item list from snapshot
        this.setState({
           loading: false,
           pantry_items: pantryList,
        });
        
      } else {
        this.setState({ pantry_items: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.pantry_items().off();
  }

  render() {
    const { text, pantry_items, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading ...</div>}

            {pantry_items ? (
              <PantryList 
                authUser={authUser}
                pantry_items={pantry_items}
                onRemovePantryItem={this.onRemovePantryItem}
                onEditPantryItem={this.onEditPantryItem}
              />
            ) : (
              <div>There are no pantry items ...</div>
            )}
            <form onSubmit={event => this.onCreatePantryItem(event, authUser)}>
              <input
                type="text"
                value={text}
                onChange={this.onChangeText}
              />
              <button type="submit">Send</button>
            </form>

          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const PantryList = ({ 
  authUser,
  pantry_items, 
  onEditPantryItem,
  onRemovePantryItem 
}) => (
  <ul>
    {pantry_items.map(pantry_item => (
      <PantryItem 
        authUser={authUser}
        key={pantry_item.uid} 
        pantry_item={pantry_item}
        onRemovePantryItem={onRemovePantryItem}
        onEditPantryItem={onEditPantryItem}
      />
    ))}
  </ul>
);

class PantryItem extends Component {
  constructor(props) {
   super(props);

   this.state = {
     editMode: false,
     editText: this.props.pantry_item.text,
   };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.pantry_item.text,
    }));
  };

  onSaveEditText = () => {
    this.props.onEditPantryItem(this.props.pantry_item, this.state.editText);

    this.setState({ editMode: false });
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  render() {
    const { authUser, pantry_item, onRemovePantryItem } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {authUser.uid === pantry_item.userId && (
          <span>
          {editMode ? (
            <input
              type="text"
              value={editText}
              onChange={this.onChangeEditText}
            />
          ) : (
            <span>
              <strong>
                {pantry_item.user|| pantry_item.user}
              </strong>{' '}
              {pantry_item.text} {pantry_item.editedAt && <span>(Edited)</span>}
            </span>
          )}

          {editMode ? (
            <span>
              <button onClick={this.onSaveEditText}>Save</button>
              <button onClick={this.onToggleEditMode}>Reset</button>
            </span>
          ) : (
            <button onClick={this.onToggleEditMode}>Edit</button>
          )}

          {!editMode && (
            <button
              type="button"
              onClick={() => onRemovePantryItem(pantry_item.uid)}
            >
              Delete
            </button>
          )}
        </span>
      )}
      </li>
    );
  }

 
}

const PantryItems = withFirebase(PantryItemsBase);

const condition = authUser => !!authUser;

export default compose(

  withAuthorization(condition),
)(PantryPage);