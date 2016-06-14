import React from 'react';
import ExploreStore from '../stores/ExploreStore';
import ExploreActions from '../actions/ExploreActions';
import cookie from 'react-cookie';

class Explore extends React.Component {
    constructor(props) {
    super(props);
    this.state = ExploreStore.getState();
    this.onChange = this.onChange.bind(this);
    this.Label = [];

  }

  componentDidMount() {
    //this.updateCanvas();
    ExploreStore.listen(this.onChange);
  }

  componentWillUnmount() {
    //this.updateCanvas();
    ExploreStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }
  
  updateCanvas(img) {

    console.log(img.target.src);
    var c = document.getElementById("drawCanvas");
    const ctx = c.getContext('2d');
    var topMap = new Image();
    topMap.src = img.target.src;
    ctx.clearRect(0 , 0, 300, 300);
    ctx.drawImage(topMap, 0 , 0, 300, 300);

  }

  renderGallery(){

      var images = [];
      var data = this.state.data;

      for (var i = 0; i < data.length; i++) {
          var img = "uploads/" + data[i].image_id;
          images.push(<img src={img}  width={345} height={345} onClick={this.updateCanvas.bind(this.src)}/>);
       }

      return images;
  }

  renderClass() {
    var options = [];
    var data = this.state.class;

    for (var i = 0; i < data.length; i++) {
      var option = data[i];
      options.push(<div ><input id="selectClass" type='checkbox' className='option' value={option}> {option}</input></div>);
    }

    return options;
  }

  handleSubmit(event) {
    event.preventDefault();
    var successMessage = ExploreActions.exploreByClass();
    var selectClass = document.getElementById("selectClass");
    this.state.data = successMessage;
    this.forceUpdate();
  }

  renderDownload() {

    var downloadUrl = "/api/DownloadLabels/" + this.state.selectedValue;
    console.log(downloadUrl);
    return (
      <form method="get" action={downloadUrl}>
        <button type="submit" className='btn btn-primary'>Download</button>
      </form>
    );
  }
  
  /* render regular page after login. */
  renderPage() {
    console.log('hello');
    return (
      <div className='container'>
      
        <h1> Open Object Marker </h1>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/upload">Upload</a></li>
          <li><a href="/label">Label</a></li>
          <li><a className="active" href="/explore">Explore</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
        
        <hr></hr>
      
        <div className='row flipInX animated'>
          <div className='panel panel-default'>
            <div className='panel-heading'>Explore</div>
            <div className='panel-body'>
            <form onSubmit={this.handleSubmit.bind(this)}>
              {this.renderClass()}
              <button type='submit' className='btn btn-primary' onclick={this.handleSubmit.bind(this)}>Submit</button>
            </form>
            {this.renderDownload()}
            </div>
            <div className='panel-body'>
              {this.renderGallery()}
            </div>
          </div>
        </div>
      </div>
      );
  }
  
  renderAuth() {
    console.log(this.state.user);
    if (this.state.user == undefined) {
      this.state.user = cookie.load('username');
      console.log(this.state.user == 'undefined' | !this.state.user);
      if (this.state.user == 'undefined' | !this.state.user) {
        console.log('??');
        return (
          <div className='container'>

            <h1> Open Object Marker </h1>
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="/upload">Upload</a></li>
              <li><a href="/label">Label</a></li>
              <li><a className="active" href="/explore">Explore</a></li>
              <li><a href="/login">Login</a></li>
            </ul>

            <hr></hr>
              <p> Please login first!</p>
            </div>
          );
      } else return this.renderPage();
    } else return this.renderPage();
  }

  render() {
    return this.renderAuth();
  }
}

export default Explore;