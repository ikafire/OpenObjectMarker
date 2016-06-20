import React from 'react';
import LabelStore from '../stores/LabelStore';
import LabelActions from '../actions/LabelActions';
import cookie from 'react-cookie';

class Label extends React.Component {
    constructor(props) {
    super(props);
    this.state = LabelStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    //this.updateCanvas();
    LabelStore.listen(this.onChange);
  }

  componentWillUnmount() {
    //this.updateCanvas();
    LabelStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  mouseDown(e) {
    // Use mozMovementX to detect the browser
    if (e.mozMovementX != undefined) {
      this.state.rect.startX = e.layerX;
      this.state.rect.startY = e.layerY;
    } else {
      this.state.rect.startX = e.pageX - this.state.offsetLeft;
      this.state.rect.startY = e.pageY - this.state.offsetTop;
    }

    this.state.drag = true;
    console.log(e);
    console.log(this.state.offsetLeft);
    console.log(this.state.offsetTop);
  }

  mouseUp(e) {

      // Because "push" in javascript is passing by reference,
      // we create a new object to push here.
      var storeLabel =  {startX: this.state.rect.startX, startY:this.state.rect.startY,
                        w: this.state.rect.w, h: this.state.rect.h, class: this.state.selectedValue};

      this.state.Labels.push(storeLabel);
      this.state.drag = false;
  }

  mouseMove(e) {
    if (this.state.drag) {
      if (e.mozMovementX != undefined) {
        this.state.rect.w = (e.layerX) - this.state.rect.startX;
        this.state.rect.h = (e.layerY) - this.state.rect.startY;
      } else {
        this.state.rect.w = (e.pageX - this.state.offsetLeft) - this.state.rect.startX;
        this.state.rect.h = (e.pageY - this.state.offsetTop) - this.state.rect.startY;
      }

      this.drawRec();
    }
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

  drawRec() {

    var img = new Image();
    img.src = this.state.LabelingImg;
    this.state.ctx.beginPath();
    this.state.ctx.fillStyle="white";
    this.state.ctx.fillRect(0,0,690,690);

    this.state.ctx.stroke();
    this.state.ctx.drawImage(img, 0 , 0, 690, 690);

    for (var i = 0; i < this.state.Labels.length; i++) {
      this.state.ctx.strokeStyle = (this.chooseColor((this.state.Labels)[i].class));
      this.state.ctx.strokeRect((this.state.Labels)[i].startX, (this.state.Labels)[i].startY, (this.state.Labels)[i].w, (this.state.Labels)[i].h);
    }

    // Current drawing label
    this.state.ctx.strokeStyle = (this.chooseColor(this.state.selectedValue));
    this.state.ctx.strokeRect(this.state.rect.startX, this.state.rect.startY, this.state.rect.w, this.state.rect.h);

  }

  updateCanvas(img) {

    this.state.Labels = [];
    this.state.LabelingImg = img.target.src;
    //this.forceUpdate();
    var c = document.getElementById("labelCanvas");
    this.state.offsetLeft = c.offsetLeft;
    this.state.offsetTop = c.offsetTop;
    console.log('click');
    c.addEventListener("mousedown", this.mouseDown.bind(this), false);
    c.addEventListener("mouseup", this.mouseUp.bind(this), false);
    c.addEventListener("mousemove", this.mouseMove.bind(this), false);

    const ctx = c.getContext('2d');
    this.state.ctx = ctx;
    var topMap = new Image();
    topMap.src = img.target.src;
    ctx.drawImage(topMap, 0 , 0, 690, 690);
    ctx.strokeStyle="red";

  }

  renderGallery(){
    var images = [];
    var data = this.state.data;

    for (var i = 0; i < data.length; i++) {
      console.log(data[i].image_id);
      console.log(data[i].labels[0]);
      if (data[i].labels[0] == "") {
        var img = "uploads/" + data[i].image_id;
        images.push(<img src={img}  width={345} height={345} onClick={this.updateCanvas.bind(this)}/>);
      }
    }

    return images;
  }

  renderClass() {
    var options = [];
    var data = this.state.class;

    for (var i = 0; i < data.length; i++) {
      var option = data[i];
      options.push(<option value={option}>{option}</option>);
    }

    return options;
  }

  handleSubmit(event) {
    event.preventDefault();
    var successMessage = LabelActions.labelByClass();
    console.log(successMessage);
    this.state.data = successMessage;
    this.forceUpdate();
  }

  handleSelect(event) {
    event.preventDefault();
    var successMessage = LabelActions.labelByClass();
    this.state.data = successMessage;
    this.forceUpdate();
    var selectClass = document.getElementById("selectClass");
    this.state.selectedValue = selectClass.options[selectClass.selectedIndex].value;
  }
  
  saveLabels(event) {
    LabelActions.save(this.state.LabelingImg, this.state.Labels);
  }

  /* render regular page after login. */
  renderPage() {
    return (
      <div className='container'>

        <h1> Open Object Marker </h1>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/upload">Upload</a></li>
          <li><a className="active" href="/label">Label</a></li>
          <li><a href="/explore">Explore</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>

        <hr></hr>

      <div className='row flipInX animated'>
        <div className='panel panel-default'>
          <div className='panel-heading'>Label</div>
          <div className='panel-body'>
            <div>
              <canvas id="labelCanvas" height={690} width={690}/>
              <select id="selectClass" onChange={this.handleSelect.bind(this)}>
                {this.renderClass()}
              </select>
            </div>
              <button type='submit' className='btn btn-primary' onClick={this.handleSubmit.bind(this)}>Submit</button>
              <button type='save' className='btn btn-primary' onClick={this.saveLabels.bind(this)}>Save</button>
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
    if (!this.state.user) {
      this.state.user = cookie.load('username');
      if (this.state.user == 'undefined' | !this.state.user) {
        return (
          <div className='container'>

            <h1> Open Object Marker </h1>
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="/upload">Upload</a></li>
              <li><a className="active" href="/label">Label</a></li>
              <li><a href="/explore">Explore</a></li>
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

export default Label;
