import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login/login';
import Facebook from './components/Login/Facebook';


export default class index extends Component {
  render() {
    return (
      <div>
      <Login/>
      <Facebook/>
        
      </div>
    )
  }
}


ReactDOM.render(<Login />, document.getElementById('root'));

