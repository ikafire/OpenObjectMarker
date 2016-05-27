import alt from '../alt';


class ExploreActions {
  constructor() {
    this.generateActions(
      'exploreSuccess',
      'exploreFail'
    );
  }

  exploreByClass(image_id) {

    var jqXHR = $.ajax({
      type: 'GET',
      url: '/api/explore',
      contentType: "application/json",
      async: false,
    });
    console.log(jqXHR.responseJSON);
    return jqXHR.responseJSON;


  }
}

export default alt.createActions(ExploreActions);