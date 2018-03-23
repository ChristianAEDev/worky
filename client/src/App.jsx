// @flow
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import IndexComponent from './components/IndexComponent';

import './App.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={IndexComponent} />
    </Switch>
  </BrowserRouter>
);

export default App;
