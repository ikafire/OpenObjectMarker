import alt from '../alt';
import ExploreActions from '../actions/ExploreActions';

class ExploreStore {
  constructor() {
    this.bindActions(ExploreActions);
    this.explore = '';
    this.data = '';
    this.class = ['car', 'person', 'bike', 'motorcycle'];
    this.selectedValue = 'car';
  }
}

export default alt.createStore(ExploreStore);