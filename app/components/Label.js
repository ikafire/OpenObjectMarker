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
    this.state.rect.startX = e.layerX - this.state.offsetLeft;
    this.state.rect.startY = e.layerY - this.state.offsetTop;
    this.state.drag = true;
  }

  mouseUp(e) {

      // Because "push" in javascript is passing by reference,
      // we create a new object to push here.
      var storeLabel =  {};
      storeLabel.startX = this.state.rect.startX;
      storeLabel.startY = this.state.rect.startY;
      storeLabel.w = this.state.rect.w;
      storeLabel.h = this.state.rect.h;
      storeLabel.class = this.state.selectedValue;

      this.state.Labels.push(storeLabel);
      //console.log(this.state.Labels);
      this.state.drag = false;
    }

  mouseMove(e) {
    if (this.state.drag) {
      this.state.rect.w = (e.layerX - this.state.offsetLeft) - this.state.rect.startX;
      this.state.rect.h = (e.layerY - this.state.offsetTop) - this.state.rect.startY;
      this.drawRec();
    }
  }

  drawRec() {

    var img = new Image();
    img.src = this.state.LabelingImg;
    this.state.ctx.beginPath();
    this.state.ctx.fillStyle="white";
    this.state.ctx.fillRect(0,0,1280,720);

    this.state.ctx.stroke();
    this.state.ctx.drawImage(img, 480 , 210, 300, 300);

    for (var i = 0; i < this.state.Labels.length; i++) {
      this.state.ctx.strokeRect((this.state.Labels)[i].startX, (this.state.Labels)[i].startY, (this.state.Labels)[i].w, (this.state.Labels)[i].h);
    }
    this.state.ctx.strokeRect(this.state.rect.startX, this.state.rect.startY, this.state.rect.w, this.state.rect.h);

  }

  updateCanvas(img) {

    console.log(img.target.src);
    this.state.LabelingImg = img.target.src;
    this.forceUpdate();
    var c = document.getElementById("drawCanvas");
    this.state.offsetLeft = c.offsetLeft;
    this.state.offsetTop = c.offsetTop;
    console.log(c.offsetLeft);
    console.log(c.offsetTop);
    c.addEventListener("mousedown", this.mouseDown.bind(this), false);
    c.addEventListener("mouseup", this.mouseUp.bind(this), false);
    c.addEventListener("mousemove", this.mouseMove.bind(this), false);

    const ctx = c.getContext('2d');
    this.state.ctx = ctx;
    var topMap = new Image();
    topMap.src = img.target.src;
    ctx.drawImage(topMap, 480 , 210, 300, 300);
    ctx.strokeStyle="red";

  }

  renderGallery(){

    var images = [];
    var data = this.state.data;

    for (var i = 0; i < data.length; i++) {
      var img = "uploads/" + data[i].image_id;
      images.push(<img src={img}  width={300} height={300} onClick={this.updateCanvas.bind(this)}/>);
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
    console.log(this.state.selectedValue);
  }
  
  saveLabels(event) {
    LabelActions.save(this.state.LabelingImg, this.state.Labels);
  }

  renderAuth() {
    console.log(this.state.user);
    if (!this.state.user) {
      this.state.user = cookie.load('username');
      console.log(this.state.user);
      if (!this.state.user) {
        return (<p> Please login first!</p>);
      }
    }
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

      <div className='row flipInX animated'>
        <div className='panel panel-default'>
          <div className='panel-heading'>Label</div>
          <div className='panel-body'>
            <div>
              <canvas id="drawCanvas" height={720} width={1280}/>
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

  render() {
    return this.renderAuth();
  }
}

export default Label;
