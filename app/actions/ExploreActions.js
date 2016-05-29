import alt from '../alt';


class ExploreActions {
  constructor() {
    this.generateActions(
      'exploreSuccess',
      'exploreFail'
    );
  }

  exploreByClass() {

    var jqXHR = $.ajax({
      type: 'GET',
      url: '/api/explore',
      contentType: "application/json",
      async: false,
    });
    return data.responseJSON;
  }
}

export default alt.createActions(ExploreActions);