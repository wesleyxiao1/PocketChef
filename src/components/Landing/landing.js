import React, { Component } from 'react'
import { Grid, Cell} from 'react-mdl'

class Landing extends React.Component {
  render() {
    return (
      <div style={{width: '80%', margin: 'auto'}}>
        <div className="header">
          <h1>Landing</h1>
        </div>
        <Grid className="demo-grid-1">
            <Cell col={12}>4</Cell>
            <Cell col={12}>4</Cell>
            <Cell col={12}>4</Cell>
        </Grid>
        </div>


    );
  }
}
export default Landing