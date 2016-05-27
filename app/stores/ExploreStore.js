import alt from '../alt';
import ExploreActions from '../actions/ExploreActions';

class ExploreStore {
  constructor() {
    this.bindActions(ExploreActions);
    this.explore = '';
    this.images = [];
  }
}

export default alt.createStore(ExploreStore);