import alt from '../alt';
import LabelActions from '../actions/LabelActions';

class LabelStore {
  constructor() {
    this.bindActions(LabelActions);
    this.label = '';
    this.data = '';
    this.class = [];
  }
}

export default alt.createStore(LabelStore);