// @flow
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import IndexComponent from './components/IndexComponent';
import Task from './components/Task';

import './App.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={IndexComponent} />
      <Route path="/tasks/:taskID" component={Task} />
    </Switch>
  </BrowserRouter>
);

export default App;
