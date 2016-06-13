import alt from '../alt';
import SignupActions from '../actions/SignupActions';

class SignupStore {
  constructor() {
    this.bindActions(SignupActions);
    this.name = '';
    this.email = '';
    this.username = '';
    this.password = '';
    this.signupValidationState = '';
  }

  onSignupSuccess(successMessage) {
    this.signupValidationState = 'has-success';
  }

  onAddLabelFail(errorMessage) {
    this.signupValidationState = 'has-error';
  }
  
  onUpdateName(event) {
    this.name = event.target.value;
    this.signupValidationState = '';
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
    this.signupValidationState = '';
  }

  onUpdateUsername(event) {
    this.username = event.target.value;
    this.signupValidationState = '';
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
    this.signupValidationState = '';
  }

  onInvalidLabel() {
    this.signupValidationState = 'has-error';
  }
}

export default alt.createStore(SignupStore);