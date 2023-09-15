import React, { Component } from "react";

import Header from "../../components/Header/Header";
import Buscador from "../../components/Buscador/Buscador";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

import "./Detalle.css";

class DetallesAlbum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      album: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/" + id)
      .then(response => response.json())
      .then(album => {
        this.setState({ album })
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <>
        <h1>Detalles del Album</h1>
        {
          this.state.album === null ? <Loader /> : (
            <>
              <h2>{this.state.album.title}</h2>
              <img src={this.state.album.cover_medium} alt={this.state.album.title} />
              <p>Artista: {this.state.album.artist.name}</p>
            </>
          )
        }
      </>
    );
  }
}

export default DetallesAlbum;