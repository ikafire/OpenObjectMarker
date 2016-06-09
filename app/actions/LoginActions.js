import alt from '../alt';


class LoginActions {
  constructor() {
    this.generateActions(
      'loginSuccess',
      'loginFail',
      'updateUsername',
      'updatePassword',
      'invalidLogin',
    );
  }

  login(username, password) {

    var data = {"username":username, "password":password};
    console.dir(JSON.stringify(data));

    var jqXHR = $.ajax({
      type: 'POST',
      url: '/api/login',
      data: JSON.stringify(data),
      contentType: "application/json",
      async: false,
    });
    return jqXHR.responseJSON;
  }
}

export default alt.createActions(LoginActions);