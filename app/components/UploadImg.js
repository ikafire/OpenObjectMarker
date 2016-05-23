import React from 'react';
import UploadImgStore from '../stores/UploadImgStore';
import UploadImgActions from '../actions/UploadImgActions'
var Dropzone = require('react-dropzone');

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

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Upload Image</div>
              <div className='panel-body'>
                <link href="dropzone.css" rel="stylesheet"/>
                <form method="post" action="/api/upload" encType ='multipart/form-data' className="dropzone" id="dropzone-example">
                <div class="fallback">
                <input name="file" type="file" multiple />
                </div>
                </form>
                <script src="dropzone.js"></script>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadImg;