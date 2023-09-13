import React, { Component } from "react";

import Header from "../../components/Header/Header";
import Buscador from "../../components/Buscador/Buscador";
import Footer from "../../components/Footer/Footer";

import "./Detalle.css";

class DetallesAlbum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      album: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/" + id)
      .then(response => response.json())
      .then(album => this.setState({ album }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <>
      <Buscador />
        <h1>Detalles del Album</h1>
        <h2>{this.state.album.title}</h2>
        <img src={this.state.album.cover_medium} alt={this.state.album.title} />
      </>
    );
  }
}

export default DetallesAlbum;