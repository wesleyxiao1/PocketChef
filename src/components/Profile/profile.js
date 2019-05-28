import React from 'react';

import { withAuthorization } from '../Session';

const Profile = () => (
  <div>
    <h1>Profile Page</h1>
    <p>The Profile Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Profile);