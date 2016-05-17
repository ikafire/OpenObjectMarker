import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddLabel from './components/AddLabel';

export default (
  <Route handler={App}>
    <Route path='/' handler={Home} />
    <Route path="/add" handler={AddLabel} />
  </Route>
);