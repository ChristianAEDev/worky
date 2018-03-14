// @flow
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import TasksList from './components/TasksList';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={TasksList} />
    </Switch>
  </BrowserRouter>
);

export default App;
