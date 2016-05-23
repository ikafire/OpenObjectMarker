import alt from '../alt';
import ExploreActions from '../actions/ExploreActions';

class ExploreStore {
  constructor() {
    this.bindActions(ExploreActions);
    this.explore = '';
    this.images = '';
  }

  onExploreSuccess(successMessage) {
    this.explore = 'has-success';
    this.images = successMessage;
  }
}

export default alt.createStore(ExploreStore);