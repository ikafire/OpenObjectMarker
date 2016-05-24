import React from 'react';
import ExploreStore from '../stores/ExploreStore';
import ExploreActions from '../actions/ExploreActions'


class Explore extends React.Component {
    constructor(props) {
    super(props);
    this.state = ExploreStore.getState();
    this.onChange = this.onChange.bind(this);
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

  /* update the class and call updateCanvas*/
  handleSubmit(event) {
    event.preventDefault();
    var images = ExploreActions.exploreByClass();
    this.updateCanvas(images);
  }

  updateCanvas(images) {

    var c = document.getElementById("drawCanvas");
    const ctx = c.getContext('2d');
    c.width = 600;
    c.height = Math.ceil(images.length / 2) * 300;

    for (var i = 0; i < images.length; i++) {
      var topMap = new Image();
      console.log('uploads/' + images[i].image_id);
      topMap.src = 'uploads/' + images[i].image_id;
      ctx.drawImage(topMap, (i % 2) * 300 , Math.floor(i / 2) * 300 , 300, 300);
      ctx.strokeStyle="red";
      ctx.rect((i % 2) * 300 + 50, Math.floor(i / 2) * 300 + 50, 200, 200);
      ctx.stroke();
    }
  }
    
  render() {
    return (
      <div className='container'>
      
        <h1> Open Object Marker </h1>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/upload">Upload</a></li>
          <li><a className="active" href="/explore">Explore</a></li>
          <li><a href="">Login</a></li>
        </ul>
        
        <hr></hr>
      
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Explore</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <canvas id="drawCanvas" width={600} height={600}/>
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

export default Explore;