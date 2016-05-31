import alt from '../alt';


class ExploreActions {
  constructor() {
    this.generateActions(
      'exploreSuccess',
      'exploreFail'
    );
  }

  /*  Call the RESTful Api to get the images path in mongodb. */
  exploreByClass() {
    var jqXHR = $.ajax({
      type: 'GET',
      url: '/api/explore',
      contentType: "application/json",
      async: false,
    });
    return jqXHR.responseJSON;
  }
}

export default alt.createActions(ExploreActions);