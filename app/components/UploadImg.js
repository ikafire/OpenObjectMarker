import React from 'react';
import UploadImgStore from '../stores/UploadImgStore';
import cookie from 'react-cookie';

class UploadImg extends React.Component {
    constructor(props) {
    super(props);
    this.state = UploadImgStore.getState();
  }

  renderAuth() {
    console.log(this.state.user);
    if (!this.state.user) {
      this.state.user = cookie.load('username');
      console.log(this.state.user);
      if (!this.state.user) {
        return (
          <div className='container'>

            <h1> Open Object Marker </h1>
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a className="active"  href="/upload">Upload</a></li>
              <li><a href="/label">Label</a></li>
              <li><a href="/explore">Explore</a></li>
              <li><a href="/login">Login</a></li>
            </ul>

            <hr></hr>
              <p> Please login first!</p>
            </div>
          );
      }
    }
    return (
    <div className='container'>

      <h1> Open Object Marker </h1>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a className="active" href="/upload">Upload</a></li>
        <li><a href="/label">Label</a></li>
        <li><a href="/explore">Explore</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>

      <hr></hr>

      <div className='row flipInX animated'>
          <div className='panel panel-default'>
            <div className='panel-heading'>Upload Your Image!</div>
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
    );
  }
  
  render() {
    return this.renderAuth();
  }
}

export default UploadImg;