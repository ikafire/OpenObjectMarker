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
      url: '/api/explore',
      contentType: "application/json",
      async: false,
    });
    return jqXHR.responseJSON;
  }
  
  save(img, labels) {
    var data = {"img":img, "Labels":[]}
    for (var i = 0; i < labels.length; i++) {
      data["Labels"].push(labels[i]);
    }
    console.log(data);
    $.ajax({
      type: 'POST',
      url: '/api/saveLabels',
      data: JSON.stringify(data),
      contentType: "application/json"
    })
      .done((data) => {
        this.actions.signupSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.signupFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(LabelActions);