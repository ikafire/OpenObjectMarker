import React from 'react';
import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';
import cookie from 'react-cookie';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    var username = this.state.username.trim();
    var password = this.state.password.trim();

    var loginData =  LoginActions.login(username, password);

    console.log(loginData);
    cookie.save('username', loginData, { path: '/' });
    console.log(cookie.load('username'));
  }
  
  render() {
    return (
      <div className='container'>
      
        <h1> Open Object Marker </h1>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/upload">Upload</a></li>
          <li><a href="/label">Label</a></li>
          <li><a href="/explore">Explore</a></li>
          <li><a className="active" href="/login">Login</a></li>
        </ul>
        
        <hr></hr>
        
        <div className='row flipInX animated'>
          <div className='panel panel-default'>
            <div className='panel-heading'>Login</div>
            <div className='panel-body'>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className={'form-group ' + this.state.labelValidationState}>
              <label className='control-label'>Username</label>
              <input type='text' className='form-control' ref='nameTextField' value={this.state.username}
                      onChange={LoginActions.updateUsername} autoFocus/>
              <label className='control-label'>Password</label>
              <input type='password' className='form-control' ref='nameTextField' value={this.state.password}
                      onChange={LoginActions.updatePassword} autoFocus/>
              </div>
              <button type='submit' className='btn btn-primary'>Login</button>
              <a href="/signup">
                <button type='button' className='btn btn-primary'>Signup</button>
              </a>
            </form>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Login;
