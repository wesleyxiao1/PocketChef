import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Login from './login';
import Facebook from './components/Facebook';


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

