import alt from '../alt';


class LabelActions {
  constructor() {
    this.generateActions(
      'labelSuccess',
      'labelFail'
    );
  }

  /*  Call the RESTful Api to get the images path in mongodb. */
  labelByClass() {
    var jqXHR = $.ajax({
      type: 'GET',
      url: '/api/label',
      contentType: "application/json",
      async: false,
    });
    return jqXHR.responseJSON;
  }
}

export default alt.createActions(LabelActions);