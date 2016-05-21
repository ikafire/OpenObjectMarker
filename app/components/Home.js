import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div className='container'>
      
        <h1> Open Object Marker </h1>
        <nav>
          <a href="">Home</a> ||
          <a href="/add/"> Upload</a> ||
          <a href=""> Explore</a> ||
          <a href=""> Login</a>
        </nav>
        
        
        
        <div className='alert alert-info'>
            Hello from Home Component
        </div>
        <button type='test' className='btn btn-primary'>test</button>
      </div>
    );
  }
}

export default Home;
