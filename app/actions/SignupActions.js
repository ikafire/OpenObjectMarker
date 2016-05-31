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

  signup(name, email, username, password) {

    var data = {"name":name, "email":email, "username":username, "password":password};
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