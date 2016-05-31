import React from 'react';
import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';

class Login extends React.Component {
  render() {
    return (
      <div className='container'>
      
        <h1> Open Object Marker </h1>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/upload">Upload</a></li>
          <li><a href="/explore">Explore</a></li>
          <li><a className="active" href="/login">Login</a></li>
        </ul>
        
        <hr></hr>
        
        
        
      </div>
    );
  }
}

export default Login;
