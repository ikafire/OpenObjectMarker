import alt from '../alt';


class ExploreActions {
  constructor() {
    this.generateActions(
      'exploreSuccess',
      'exploreFail'
    );
  }

  /*  Call the RESTful GET Api to get the images path in mongodb. */
  exploreByClass(cls) {

    var exploreUrl = "/api/explore/";
    var firstAppend = true;
    for (var i = 0; i < cls.length; i++) {
      if(cls[i].checked) {
        if(firstAppend) {
          exploreUrl += cls[i].value;
          firstAppend = false;
        }
        else exploreUrl += ("," + cls[i].value);
      }
    }
    console.log(exploreUrl);
    var jqXHR = $.ajax({
      type: 'GET',
      url: exploreUrl,
      contentType: "application/json",
      async: false,
    });
    return jqXHR.responseJSON;
  }
}

export default alt.createActions(ExploreActions);