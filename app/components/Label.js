import React from 'react';
import LabelStore from '../stores/LabelStore';
import LabelActions from '../actions/LabelActions';

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
      console.log(this.state.ctx.offsetLeft);
      console.log(this.state.rect.startY);
      this.state.drag = true;
    }

  mouseUp(e) {
      //this.state.Labels.push(this.state.rect);
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
    this.state.ctx.clearRect(0 , 0, 300, 300);
    var img = new Image();
    img.src = this.state.LabelingImg;
    this.state.ctx.drawImage(img, 0 , 0, 300, 300);
    this.state.ctx.rect(this.state.rect.startX, this.state.rect.startY, this.state.rect.w, this.state.rect.h);
    this.state.ctx.stroke();
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
    ctx.drawImage(topMap, 0 , 0, 300, 300);
    ctx.strokeStyle="red";

  }

  renderImg(){
    var img = "";
    if (this.state.LabelingImg) {
      console.log(this.state.LabelingImg);
      img = <img src={this.state.LabelingImg}  width={300} height={300}/>;
    }

    return img
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
    this.state.data = successMessage;
    this.forceUpdate();
  }
  
  handleSelect(event) {
    event.preventDefault();
    var successMessage = LabelActions.labelByClass();
    this.state.data = successMessage;
    this.forceUpdate();
    var selectClass = document.getElementById("selectClass");
    var selectedValue = selectClass.options[selectClass.selectedIndex].value;
  }

  render() {

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
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div>
                  <canvas id="drawCanvas" height={432} width={768}/>
                  <select id="selectClass" onChange={this.handleSelect.bind(this)}>
                    {this.renderClass()}
                  </select>
                </div>
                <button type='submit' className='btn btn-primary' onclick={this.handleSubmit.bind(this)}>Submit</button>
              </form>
            </div>
            <div className='scratcher'>
            <canvas id="drawCanvas" width={300} height={300}/>
            {this.renderImg()}
            </div>
            <div className='panel-body'>
            {this.renderGallery()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Label;
