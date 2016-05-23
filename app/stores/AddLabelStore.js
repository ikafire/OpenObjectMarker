import alt from '../alt';
import AddLabelActions from '../actions/AddLabelActions';

class AddLabelStore {
  constructor() {
    this.bindActions(AddLabelActions);
    this.image_path = '';
    this.labels = '';
    this.helpBlock = '';
    this.labelValidationState = '';
  }

  onAddLabelSuccess(successMessage) {
    this.labelValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onAddLabelFail(errorMessage) {
    this.labelValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateUser_id(event) {
    this.user_id = event.target.value;
    this.labelValidationState = '';
    this.helpBlock = '';
  }

  onUpdateImage_id(event) {
    this.image_id = event.target.value;
    this.labelValidationState = '';
    this.helpBlock = '';
  }

  onUpdateLabel(event) {
    this.label = event.target.value;
    this.labelValidationState = '';
    this.helpBlock = '';
  }

  onInvalidLabel() {
    this.labelValidationState = 'has-error';
    this.helpBlock = 'Please enter a Label.';
  }
}

export default alt.createStore(AddLabelStore);