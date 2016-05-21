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
        
        <p>Open Object Marker is a platform for you to share images and annotate them through collaboration.</p>
        <p>Upload your images and hope others to annotate them for you!</p>
        <p>The more you annotate, the more you can download!</p>
        
      </div>
    );
  }
}

export default Home;
