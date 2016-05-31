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

    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: JSON.stringify(data),
      contentType: "application/json"
    })
      .done((data) => {
        this.actions.loginSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.loginFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(LoginActions);