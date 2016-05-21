import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div className='container'>
      
        <h1> Open Object Marker </h1>
        <ul>
          <li><a className="active" href="">Home</a></li>
          <li><a href="/add">Upload</a></li>
          <li><a href="">Explore</a></li>
          <li><a href="">Login</a></li>
        </ul>
        
        <hr></hr>
        
        
        <div className='alert alert-info'>
            Hello from Home Component
        </div>
        <button type='test' className='btn btn-primary'>test</button>
      </div>
    );
  }
}

export default Home;
