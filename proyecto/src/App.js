import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './screens/Home/Home';
// import Favoritos from './screens/Favoritos/Favoritos';
// import Detalle from './screens/Detalle/Detalle';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        {/* <Route exact path="/favoritos" component={Favoritos} />
        <Route exact path="/detalle/:id" component={Detalle} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;

