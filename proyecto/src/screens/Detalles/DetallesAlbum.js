import React, { Component } from "react";

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
      <div>
        <h1>Detalles del Album</h1>
        <h2>{this.state.album.title}</h2>
        <img src={this.state.album.cover_medium} alt={this.state.album.title} />
      </div>
    );
  }
}

export default DetallesAlbum;