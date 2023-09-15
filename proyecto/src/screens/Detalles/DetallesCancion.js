import React, { Component } from "react";

import Buscador from "../../components/Buscador/Buscador";


import "./Detalle.css";

class DetallesCancion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: {},
      favsCanciones: [],
      favorito: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/" + id)
      .then(response => response.json())
      .then(track => this.setState({ track }))
      .catch(error => console.log(error));

      let favsStringCancion = localStorage.getItem("cancion")
        
      let favsArrayCancion = JSON.parse(favsStringCancion)

      if (favsArrayCancion === null) {
          favsArrayCancion = []
      } else {
          if (favsArrayCancion.includes(parseInt(this.props.match.params.id))) {
              this.setState({
                  favorito: true
              })
          }
          this.setState({
              favsCanciones: favsArrayCancion
          })
      }
  }

  toggleFavorite() {
    let stringFavoritos = localStorage.getItem("favoritos-" + this.props.type);
    let arrayFavoritos = JSON.parse(stringFavoritos)

    if (arrayFavoritos === null) {
        arrayFavoritos = [];
    } 

    // si estaba en favoritos, lo saco
    if (this.state.isFavorite) {
        arrayFavoritos = arrayFavoritos.filter(id => id !== this.props.id)
    } else {
        arrayFavoritos.push(this.props.id);
    }

    let nuevoStringFavoritos = JSON.stringify(arrayFavoritos);
    localStorage.setItem("favoritos-" + this.props.type, nuevoStringFavoritos);

    this.setState({
        isFavorite: !this.state.isFavorite
    });
}

  render() {
    return (
      <>
      <Buscador />
        <h1>Detalles de la canción</h1>
        <h2>{this.state.track.title}</h2>
        <h2>{this.state.track.name}</h2>
        <img src={this.state.track.album && this.state.track.album.cover_big} alt="Imagen de la canción" />
        <audio controls> 
        <source src={this.state.track.preview} /> 
        </audio> 
        <button onClick={() => this.toggleFavorite()}>{this.state.isFavorite ? "Quitar" : "Agregar"} a favoritos</button>
      </>
    );
  }
}

export default DetallesCancion;