import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';

const PantryPage = () => (
  <div>
    <h1>Pantry Page</h1>
    <p>The Pantry Page is accessible by every signed in user.</p>

    <Pantry_items />
  </div>
);

class PantryBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      pantry_items: [],
    };
  }  
}

const Pantry_items = withFirebase(PantryBase);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(PantryPage);