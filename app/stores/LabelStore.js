import alt from '../alt';
import LabelActions from '../actions/LabelActions';

class LabelStore {
  constructor() {
    this.bindActions(LabelActions);
    this.label = '';
    this.data = '';
    this.Labels = [];
    this.LabelingImg = "";
    this.toShow = '';
    this.drag = false;
    this.rect = {};  // Now labeling
    this.offsetLeft = 0;
    this.offsetTop = 0;
    this.ctx = "";
    this.class = ['car', 'person', 'bike', 'motorcycle'];
    this.selectedValue = 'car';
    this.user = '';
  }
}

export default alt.createStore(LabelStore);