import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import UploadImg from './components/UploadImg';
import Explore from './components/Explore';

export default (
  <Route handler={App}>
    <Route path='/home' handler={Home} />
    <Route path="/upload" handler={UploadImg} />
    <Route path="/explore" handler={Explore} />
  </Route>
);