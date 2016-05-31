import alt from '../alt';
import LoginActions from '../actions/LoginActions';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);
    this.username = '';
    this.password = '';
    this.loginValidationState = '';
  }

  onLoginSuccess(successMessage) {
    this.loginValidationState = 'has-success';
  }

  onAddLabelFail(errorMessage) {
    this.loginValidationState = 'has-error';
  }

  onUpdateUsername(event) {
    this.username = event.target.value;
    this.loginValidationState = '';
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
    this.loginValidationState = '';
  }

  onInvalidLabel() {
    this.loginValidationState = 'has-error';
  }
}

export default alt.createStore(LoginStore);