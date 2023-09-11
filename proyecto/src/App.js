import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './screens/Home/Home';
import Favoritos from './screens/Favoritos/Favoritos';
import VerTodasCanciones from './screens/VerTodasCanciones/VerTodasCanciones';
import VerTodasAlbumes from './screens/VerTodasAlbumes/VerTodasAlbumes';

// import Favoritos from './screens/Favoritos/Favoritos';
// import Detalle from './screens/Detalle/Detalle';
import DetallesAlbum from './screens/Detalles/DetallesAlbum';
import DetallesCancion from './screens/Detalles/DetallesCancion';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact path="/favoritos" component={Favoritos} />
        <Route path="/ver-canciones" component={VerTodasCanciones} />
        <Route path="/ver-albumes" component={VerTodasAlbumes} />
        {/* <Route exact path="/favoritos" component={Favoritos} /> */}
        <Route exact path="/detalle-album/:id" component={DetallesAlbum} />
        <Route exact path="/detalle-cancion/:id" component={DetallesCancion} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

