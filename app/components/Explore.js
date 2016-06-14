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
  
  updateCanvas() {

    /* var c = document.getElementById("drawCanvas");
    const ctx = c.getContext('2d');
    var data = this.state.data;
    console.log(data);
    console.log(data[0].labels[0]);
    c.width = 600;
    c.height = Math.ceil(data.length / 2) * 300;

    for (var i = 0; i < data.length; i++) {
      var topMap = new Image();
      console.log('uploads/' + data[i].image_id);
      topMap.src = 'uploads/' + data[i].image_id;
      ctx.drawImage(topMap, (i % 2) * 300 , Math.floor(i / 2) * 300 , 300, 300);
      ctx.strokeStyle="red";
      ctx.rect((i % 2) * 300 + 50, Math.floor(i / 2) * 300 + 50, 200, 200);
      ctx.stroke();
    } */
    
    var ctxs = document.getElementsByClassName("drawCanvas");
    var data = this.state.data;
    console.log(ctxs);
    
    for (var i = 0; i < 5; i++) {
      if (data[i]) {
        console.log(data[i]);
        const labels = data[i].labels;
        const ctx = ctxs[i].getContext('2d');
        console.log(ctx);
        ctx.height = 345;
        ctx.width = 345;
        var topMap = new Image();
        topMap.src = 'uploads/' + data[i].image_id;
        ctx.drawImage(topMap, 0, 0 , 345, 345);
        for (var j = 0; j < labels.length; j++) {
          var label = labels[j];
          ctx.strokeStyle="red";
          ctx.rect(label.startX / 2, label.startY / 2, label.w / 2, label.h / 2);
          console.log(label.startX, label.startY, label.w, label.h);
          ctx.stroke();
        }
        
      } else break;
    }

  }

  renderGallery(){

      var images = [];
      var data = this.state.data;
      /*
      for (var i = 0; i < data.length; i++) {
          var img = "uploads/" + data[i].image_id;
          images.push(<img src={img}  width={345} height={345} onClick={this.updateCanvas.bind(this.src)}/>);
       }

      return images;*/
      
      for (var i = 0; i < 5; i++) {
        images.push(<canvas id="drawCanvas" className="drawCanvas" height={345} width={345}/>);
      }
      console.log(images);
      return images;
  }

  renderClass() {
    var options = [];
    var data = this.state.class;

    for (var i = 0; i < data.length; i++) {
      var option = data[i];
      options.push(<label ><input id="selectClass" type='checkbox' className='option' value={option}> {option}</input></label>);
    }

    return options;
  }

  handleSubmit(event) {
    event.preventDefault();
    var checkboxes = document.getElementsByClassName("class");
    var successMessage = ExploreActions.exploreByClass();
    var selectClass = document.getElementById("selectClass");
    this.state.data = successMessage;
    this.updateCanvas();
    this.forceUpdate();
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

    var checkboxes = document.getElementsByClassName("class");
    console.log(checkboxes);
    
    // var downloadUrl = "/api/DownloadLabels/" + this.state.selectedValue;
    // console.log(downloadUrl);
    return (
      <form method="get" action={this.downloadUrl()}>
        <button type="submit" className='btn btn-primary'>Download</button>
      </form>
    );
  }
  
  /* render regular page after login. */
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