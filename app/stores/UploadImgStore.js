import alt from '../alt';
import UploadImgActions from '../actions/UploadImgActions';

class UploadImgStore {
  constructor() {
    this.bindActions(UploadImgActions);
    this.imgFile = '';
    this.helpBlock = '';
    this.nameValidationState = '';
  }

  onUploadImgSuccess(successMessage) {
    this.nameValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onUploadImgFail(errorMessage) {
    this.nameValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateImageFile(event) {
    var reader = new FileReader();
    this.imgFile = event.target.files[0];
    console.log(this.imgFile);
    this.nameValidationState = '';
    this.helpBlock = '';
  }

  onInvalidImageFile() {
    this.nameValidationState = 'has-error';
    this.helpBlock = 'Please enter a name.';
  }
}

export default alt.createStore(UploadImgStore);