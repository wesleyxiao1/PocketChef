import React from 'react';

import { withAuthorization } from '../Session';

const Pantry = () => (
  <div>
    <h1>Pantry Page</h1>
    <p>The Pantry Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Pantry);