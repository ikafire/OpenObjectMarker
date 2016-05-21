import React from 'react';
import UploadImgStore from '../stores/UploadImgStore';
import UploadImgActions from '../actions/UploadImgActions'

class UploadImg extends React.Component {
    constructor(props) {
    super(props);
    this.state = UploadImgStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    UploadImgStore.listen(this.onChange);
  }

  componentWillUnmount() {
    UploadImgStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    var imgFile = this.state.imgFile;

    UploadImgActions.uploadImg(imgFile);

  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Upload Image</div>
              <div className='panel-body'>
                <form method = 'POST' encType ='multipart/form-data' action = '/api/upload'>
                   <input type='file' name="images"/>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadImg;