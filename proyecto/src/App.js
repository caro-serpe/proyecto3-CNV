import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './screens/Home/Home';
import Favoritos from './screens/Favoritos/Favoritos';
import VerTodasCanciones from './screens/VerTodasCanciones/VerTodasCanciones';
import VerTodasAlbumes from './screens/VerTodasAlbumes/VerTodasAlbumes';

import DetallesAlbum from './screens/Detalles/DetallesAlbum';
import DetallesCancion from './screens/Detalles/DetallesCancion';
import NotFound from './screens/NotFound'

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact path="/favoritos" component={Favoritos} />
        <Route path="/ver-canciones" component={VerTodasCanciones} />
        <Route path="/ver-albumes" component={VerTodasAlbumes} />
        <Route exact path="/favoritos" component={Favoritos} />
        <Route exact path="/detalle-album/:id" component={DetallesAlbum} />
        <Route exact path="/detalle-cancion/:id" component={DetallesCancion} />
        <Route component={NotFound}/>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

