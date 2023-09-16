import React, { Component } from "react";

import Buscador from "../../components/Buscador/Buscador";
import Loader from "../../components/Loader/Loader";

import "./Detalle.css";

class DetallesCancion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: null,
      isFavorite: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/" + id)
      .then(response => response.json())
      .then(track => {
        this.setState({ track })
      })
      .catch(error => console.log(error));

    let stringFavoritos = localStorage.getItem("favoritos-cancion");
    let arrayFavoritos = JSON.parse(stringFavoritos)

    if (arrayFavoritos) {
      this.setState({
        isFavorite: arrayFavoritos.includes(parseInt(id))
      });
    }
  }

  toggleFavorite() {
    let stringFavoritos = localStorage.getItem("favoritos-cancion");
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
    localStorage.setItem("favoritos-cancion", nuevoStringFavoritos);

    this.setState({
      isFavorite: !this.state.isFavorite
    });
  }

  render() {
    return (
      <>
        <h1>Detalles de la canción</h1>
        {
          this.state.track === null ? <Loader /> : (
            <>
              <h2>{this.state.track.title}</h2>
              <h2>{this.state.track.name}</h2>
              <img src={this.state.track.album && this.state.track.album.cover_big} alt="Imagen de la canción" />
              <audio controls> 
              <source src={this.state.track.preview} /> 
              </audio> 
            </>
          )
        }
        <button onClick={() => this.toggleFavorite()}>{this.state.isFavorite ? "Quitar" : "Agregar"} a favoritos</button>
      </>
    );
  }
}

export default DetallesCancion;