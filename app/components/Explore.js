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
  
  chooseColor(cls) {
    var color = '';
    switch(cls) {
      case 'car':
        color = 'red';
        break;
      case 'person':
        color = 'blue';
        break;
      case 'bike':
        color = 'green';
        break;
      case 'motorcycle':
        color = 'yellow';
        break;
      default:
        color = 'white';
        break;
    }
    console.log(color);
    return color;
  }

  updateCanvas() {

    var ctxs = document.getElementsByClassName("drawCanvas");
    var data = this.state.data;

    /* Clean all */
    for (var i = 0; i < 6; i++) {
      const ctx = ctxs[i].getContext('2d');
      ctx.height = 345;
      ctx.width = 345;
      ctx.fillStyle="white";
    	ctx.fillRect(0,0,345,345);
    }

    for (var i = 0; i < data.length; i++) {
      var idx = i + this.state.index * 6;
      const labels = data[idx].labels;
      const ctx = ctxs[i].getContext('2d');
      ctx.height = 345;
      ctx.width = 345;
      ctx.fillStyle="white";
    	ctx.fillRect(0, 0, 345, 345);
      var topMap = new Image();
      ctx.beginPath();
      topMap.src = 'uploads/' + data[idx].image_id;
      ctx.drawImage(topMap, 0, 0 , 345, 345);
      ctx.stroke();

      // Delay for loading the image
      for (var j = 0; j < 1000000; j++) {}

      for (var j = 0; j < labels.length; j++) {
        var label = labels[j];
        ctx.strokeStyle = this.chooseColor(label.class);
        ctx.strokeRect(label.startX / 2, label.startY / 2, label.w / 2, label.h / 2);
      }
    }
  }

  renderGallery(){
    var images = [];
    var data = this.state.data;

    for (var i = 0; i < 6; i++) {
      images.push(<canvas id="drawCanvas" className="drawCanvas" height={345} width={345}/>);
    }
    return images;
  }

  renderClass() {
    var options = [];
    var data = this.state.class;

    for (var i = 0; i < data.length; i++) {
      var option = data[i];
      options.push(<label ><input id="selectClass" type='checkbox' className='class' value={option}> {option}</input></label>);
    }

    return options;
  }

  handleSubmit(event) {
    event.preventDefault();
    var checkboxes = document.getElementsByClassName("class");
    var successMessage = ExploreActions.exploreByClass(checkboxes);
    this.state.data = successMessage;
    this.state.index = 0;
    this.updateCanvas();
    this.forceUpdate();
  }

  handlePrev(event){
    if(this.state.index <= 0)
      this.state.index = 0;
    else {
      this.state.index -=1;
    }
    this.updateCanvas();
  }

  handleNext(event){
    if(this.state.index < Math.floor(this.state.data.length / 6)) {
      this.state.index += 1;
    }
    this.updateCanvas();
  }

  downloadUrl() {
    var checkboxes = document.getElementsByClassName("class");
    
    var downloadUrl = "/api/DownloadLabels/";
    var firstAppend = true;
    for (var i = 0; i < checkboxes.length; i++) {
      if(checkboxes[i].checked) {
        if(firstAppend) {
          downloadUrl += checkboxes[i].value;
          firstAppend = false;
        }
        else downloadUrl += ("," + checkboxes[i].value);
      }
    }
    
    return downloadUrl;
  }

  renderDownload() {
    return (
      <form method="get" action={this.downloadUrl()}>
        <button id="rightButton" type="submit" className='btn btn-primary'>Download Labels</button>
      </form>
    );
  }
  
  /* Render regular page after login. */
  renderPage() {
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
                <div >
                  {this.renderClass()}
                </div>
                <button type='submit' className='btn btn-primary' onclick={this.handleSubmit.bind(this)}>Submit</button>
              </form>
              <div className='panel-body'>
                {this.renderGallery()}
              </div>
              <button type='submit' className='btn btn-primary' onClick={this.handlePrev.bind(this)}>prev</button>
              <button type='submit' className='btn btn-primary' onClick={this.handleNext.bind(this)}>next</button>
              {this.renderDownload()}
              <form method="get" action="/api/DownloadImgs">
                <button id="rightButton" type="submit" className='btn btn-primary'>Download Images</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      );
  }

  renderAuth() {
    if (this.state.user == undefined) {
      this.state.user = cookie.load('username');
      if (this.state.user == 'undefined' | !this.state.user) {
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