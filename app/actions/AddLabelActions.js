import alt from '../alt';


class AddLabelActions {
  constructor() {
    this.generateActions(
      'addLabelSuccess',
      'addLabelFail',
      'updateUser_id',
      'updateImage_id',
      'updateLabel',
      'invalidLabel',
    );
  }

  addLabel(user_id, image_id, labels) {

    var data = {"user_id":user_id, "image_id":image_id, "labels":labels};
    console.dir(JSON.stringify(data));

    $.ajax({
      type: 'POST',
      url: '/api/labels',
      data: JSON.stringify(data),
      contentType: "application/json"
    })
      .done((data) => {
        this.actions.addLabelSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addLabelFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddLabelActions);