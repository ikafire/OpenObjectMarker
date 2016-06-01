import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import UploadImg from './components/UploadImg';
import Explore from './components/Explore';
import Label from './components/Label';
import Login from './components/Login';
import Signup from './components/Signup';

export default (
  <Route handler={App}>
    <Route path='/home' handler={Home} />
    <Route path="/upload" handler={UploadImg} />
    <Route path="/explore" handler={Explore} />
    <Route path="/label" handler={Label} />
    <Route path="/login" handler={Login} />
    <Route path="/signup" handler={Signup} />
  </Route>
);