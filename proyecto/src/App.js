import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './screens/Home/Home';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

