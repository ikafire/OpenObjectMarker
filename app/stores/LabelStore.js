import alt from '../alt';
import LabelActions from '../actions/LabelActions';

class LabelStore {
  constructor() {
    this.bindActions(LabelActions);
    this.label = '';
    this.data = '';
  }
}

export default alt.createStore(LabelStore);