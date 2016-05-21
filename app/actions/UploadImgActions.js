import alt from '../alt';


class UploatImgActions {
  constructor() {
    this.generateActions(
      'addImageFileSuccess',
      'addImageFileFail',
      'updateImageFile',
      'invalidImageFile',
    );
  }
  
  uploadImg(imgFile) {
    console.log('uploadImg');
    console.log(imgFile);
      
    $.ajax({
      type: 'POST',
      url: '/api/upload',
      data: imgFile,
      contentType: "application/json"
    })
      .done((data) => {
        this.actions.addImageFileSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addImageFileFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(UploatImgActions);