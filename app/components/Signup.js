import React from 'react';
import SignupStore from '../stores/SignupStore';
import SignupActions from '../actions/SignupActions';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = SignupStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SignupStore.listen(this.onChange);
  }

  componentWillUnmount() {
    SignupStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    var name = this.state.name.trim();
    var email = this.state.email.trim();
    var username = this.state.username.trim();
    var password = this.state.password.trim();
    
    SignupActions.signup(name, email, username, password);

  }
  
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
        
        <div className='row flipInX animated'>
          <div className='panel panel-default'>
            <div className='panel-heading'>Signup</div>
            <div className='panel-body'>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className={'form-group ' + this.state.labelValidationState}>
              <label className='control-label'>Name</label>
              <input type='text' className='form-control' ref='nameTextField' value={this.state.name}
                      onChange={SignupActions.updateName} autoFocus/>
              <label className='control-label'>E-mail</label>
              <input type='text' className='form-control' ref='nameTextField' value={this.state.email}
                      onChange={SignupActions.updateemail} autoFocus/>
              <label className='control-label'>Username</label>
              <input type='text' className='form-control' ref='nameTextField' value={this.state.username}
                      onChange={SignupActions.updateUsername} autoFocus/>
              <label className='control-label'>Password</label>
              <input type='text' className='form-control' ref='nameTextField' value={this.state.password}
                      onChange={SignupActions.updatePassword} autoFocus/>
              </div>
              <button type='submit' className='btn btn-primary'>Signup</button>
              <a href="/login">
                <button type='button' className='btn btn-primary'>Cancel</button>
              </a>
            </form>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Signup;
