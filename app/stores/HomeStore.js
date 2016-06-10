import alt from '../alt';

class HomeStore {
  constructor() {
    this.user = '';
  }
}

export default alt.createStore(HomeStore);