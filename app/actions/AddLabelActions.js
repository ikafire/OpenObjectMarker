import alt from '../alt';


class AddLabelActions {
  constructor() {
    this.generateActions(
      'addLabelSuccess',
      'addLabelFail',
      'updateLabel',
      'invalidLabel',
    );
  }
  
  addLabel(label) {
    $.ajax({
      type: 'POST',
      url: '/api/labels',
      data: { label: label}
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