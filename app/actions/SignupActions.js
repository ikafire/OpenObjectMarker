import alt from '../alt';


class SignupActions {
  constructor() {
    this.generateActions(
      'signupSuccess',
      'signupFail',
      'updateName',
      'updateEmail',
      'updateUsername',
      'updatePassword',
      'invalidSignup',
    );
  }

  signup(username, password) {

    var data = {"username":username, "password":password};
    console.dir(JSON.stringify(data));

    $.ajax({
      type: 'POST',
      url: '/api/signup',
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

export default alt.createActions(SignupActions);