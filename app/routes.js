import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddLabel from './components/AddLabel';
import UploadImg from './components/UploadImg';
import Explore from './components/Explore';

export default (
  <Route handler={App}>
    <Route path='/' handler={Home} />
    <Route path="/add" handler={AddLabel} />
    <Route path="/upload" handler={UploadImg} />
    <Route path="/explore" handler={Explore} />
  </Route>
);