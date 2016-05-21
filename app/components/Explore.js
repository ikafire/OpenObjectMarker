import React from 'react';
import ExploreStore from '../stores/ExploreStore';
import ExploreActions from '../actions/ExploreActions'

import ImageLoader from 'react-imageloader'


class Explore extends React.Component {
    constructor(props) {
    super(props);
    this.state = ExploreStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.updateCanvas();
    ExploreStore.listen(this.onChange);
  }

  componentWillUnmount() {
    this.updateCanvas();
    ExploreStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  updateCanvas() {
        var c=document.getElementById("drawCanvas");
        const ctx = c.getContext('2d');
        var topMap = new Image();
        topMap.src = 'uploads/pika.png';
        ctx.drawImage(topMap, 0, 0, 300, 300);
        ctx.strokeStyle="red";
        ctx.rect(50,50, 200, 200);
        ctx.stroke();
    }
    
  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Explore</div>
              <div className='panel-body'>
                <canvas id="drawCanvas" width={300} height={300}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Explore;