import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='alert alert-info'>
            Hello from Home Component
        </div>
        <button type='test' className='btn btn-primary'>test</button>
      </div>
    );
  }
}

export default Home;
