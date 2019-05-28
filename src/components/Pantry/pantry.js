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
      pantry_items: [],
    };
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreatePantryItem = (event, authUser) => {
    this.props.firebase.pantry_items().push({
      text: this.state.text,
      userId: authUser.uid,
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.pantry_items().on('value', snapshot => {
      const pantryItemObject = snapshot.val();
      if (pantryItemObject) {
        const pantryList = Object.keys(pantryItemObject).map(key => ({
          ...pantryItemObject[key],
          uid: key,
        }));
        // convert messages list from snapshot
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
              <PantryList pantry_items={pantry_items} />
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

const PantryList = ({ pantry_items }) => (
  <ul>
    {pantry_items.map(pantry_item => (
      <PantryItem key={pantry_item.uid} pantry_item={pantry_item} />
    ))}
  </ul>
);

const PantryItem = ({ pantry_item }) => (
  <li>
    <strong>{pantry_item.userId}</strong> {pantry_item.text}
  </li>
);

const PantryItems = withFirebase(PantryItemsBase);

const condition = authUser => !!authUser;

export default compose(

  withAuthorization(condition),
)(PantryPage);