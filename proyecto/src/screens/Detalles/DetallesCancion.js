import React, { Component } from "react";

class DetallesCancion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/" + id)
      .then(response => response.json())
      .then(track => this.setState({ track }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>Detalles de la canción</h1>
        <h2>{this.state.track.title}</h2>
        <img src={this.state.track.album && this.state.track.album.cover_big} alt="Imagen de la canción" />
        <h2>{this.state.track.name}</h2>
      </div>
    );
  }
}

export default DetallesCancion;