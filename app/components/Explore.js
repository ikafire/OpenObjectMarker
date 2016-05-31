import React from 'react';
import ExploreStore from '../stores/ExploreStore';
import ExploreActions from '../actions/ExploreActions';

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

  doMouseDown(event) {
    
  }
  
  updateCanvas(img) {

    console.log(img.target.src);
    var c = document.getElementById("drawCanvas");
    //c.addEventListener("mousedown", this.doMouseDown, false);
    //c.addEventListener("mouseup", this.doMouseDown, false);
    //c.addEventListener("mouse", this.doMouseDown, false);
    const ctx = c.getContext('2d');
    var topMap = new Image();
    topMap.src = img.target.src;
    ctx.clearRect(0 , 0, 300, 300);
    ctx.drawImage(topMap, 0 , 0, 300, 300);
    /*
    ctx.strokeStyle="red";
    ctx.rect(50, 50, 200, 200);
    ctx.stroke();*/

  }

  renderGallery(){

      var images = [];
      var data = this.state.data;

      for (var i = 0; i < data.length; i++) {
          var img = "uploads/" + data[i].image_id;
          images.push(<img src={img}  width={300} height={300} onClick={this.updateCanvas.bind(this.src)}/>);
       }

      return images;
  }

  handleSubmit(event) {
    event.preventDefault();
    var successMessage = ExploreActions.exploreByClass();
    this.state.data = successMessage;
    this.forceUpdate();
  }

  render() {

    return (
      <div className='container'>
      
        <h1> Open Object Marker </h1>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/upload">Upload</a></li>
          <li><a className="active" href="/explore">Explore</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
        
        <hr></hr>
      
        <div className='row flipInX animated'>
          <div className='panel panel-default'>
            <div className='panel-heading'>Explore</div>
            <div className='panel-body'>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <button type='submit' className='btn btn-primary' onclick={this.handleSubmit.bind(this)}>Submit</button>
            </form>
            </div>
            <div className='panel-body'>
            <canvas id="drawCanvas" height={300} width={300}/> </div>
            <div className='panel-body'>
            {this.renderGallery()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Explore;