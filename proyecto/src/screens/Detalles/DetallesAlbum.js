import React, { Component } from "react";

import Loader from "../../components/Loader/Loader";

import "./Detalle.css";

class DetallesAlbum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      album: null,
      isFavorite: false
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

    let stringFavoritos = localStorage.getItem("favoritos-album");
    let arrayFavoritos = JSON.parse(stringFavoritos)

    if (arrayFavoritos) {
      this.setState({
        isFavorite: arrayFavoritos.includes(parseInt(id))
      });
    }
  }

  toggleFavorite() {
    let stringFavoritos = localStorage.getItem("favoritos-album");
    let arrayFavoritos = JSON.parse(stringFavoritos)

    if (arrayFavoritos === null) {
      arrayFavoritos = [];
    }

    // si estaba en favoritos, lo saco
    if (this.state.isFavorite) {
      arrayFavoritos = arrayFavoritos.filter(id => id !== parseInt(this.props.match.params.id))
    } else {
      arrayFavoritos.push(parseInt(this.props.match.params.id));
    }

    let nuevoStringFavoritos = JSON.stringify(arrayFavoritos);
    localStorage.setItem("favoritos-album", nuevoStringFavoritos);

    this.setState({
      isFavorite: !this.state.isFavorite
    });
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
        <p>Canciones del album:</p>
        {
          this.state.album === null ? <Loader /> : this.state.album.tracks.data.map((cancion, i) => (
            <div key={cancion + i}>
              <a href={"/detalle-cancion/" + cancion.id}><ul><li >{cancion.title}</li></ul></a>
            </div>
          ))
        }
        <button onClick={() => this.toggleFavorite()}>{this.state.isFavorite ? "Quitar" : "Agregar"} a favoritos</button>
      </>
    );
  }
}

export default DetallesAlbum;