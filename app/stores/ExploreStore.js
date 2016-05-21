import alt from '../alt';
import ExploreActions from '../actions/ExploreActions';

class ExploreStore {
  constructor() {
    this.bindActions(ExploreActions);
    this.explore = '';
  }

  onExploreSuccess(successMessage) {
    this.explore = 'has-success';
  }
}

export default alt.createStore(ExploreStore);