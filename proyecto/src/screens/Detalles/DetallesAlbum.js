import React, { Component } from "react";

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
      let favsStringAlbum = localStorage.getItem("cancion")
      let favsArrayAlbum = JSON.parse(favsStringAlbum)
      if (favsArrayAlbum === null) {
        favsArrayAlbum = []
    } else {
        if (favsArrayAlbum.includes(parseInt(this.props.match.params.id))) {
            this.setState({
                favorito: true
            })
        }
        this.setState({
            favsAlbum: favsArrayAlbum
        })
    }
  }
  agregarFav(id) {
    let favsString = localStorage.getItem(this.props.tipo)
    let favsArray = JSON.parse(favsString)
    if (favsArray === null) {
        favsArray = [id]
        let favsStringNuevo = JSON.stringify(favsArray)
        localStorage.setItem(this.props.tipo, favsStringNuevo)
    } else {
        favsArray.push(id)
        let favsStringNuevo = JSON.stringify(favsArray)
        localStorage.setItem(this.props.tipo, favsStringNuevo)
    }
    this.setState({
        favorito: true
    })
}

quitarFav(id) {
    let favsString = localStorage.getItem(this.props.tipo)
    let favsArray = JSON.parse(favsString)

    if (favsArray === null) {
        favsArray = []
        let favsStringNuevo = JSON.stringify(favsArray)
        localStorage.setItem(this.props.tipo, favsStringNuevo)
    } else {
        let favsFiltrado = favsArray.filter((elm) => id !== elm)
        let favsStringNuevo = JSON.stringify(favsFiltrado)
        localStorage.setItem(this.props.tipo, favsStringNuevo)
    }
    this.setState({
        favorito: false
    })
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
        {/* { */}
          {/* this.state.album.tracklist.data.map((cancion, i) => ( */}
            {/* <div key={cancion + i}> */}
                {/* <ul ><li >{cancion.title}</li></ul> */}
             {/* </div>  */}
            {/* ))  */}
        {/* 2}  */}
        {
          this.state.favorito ?
            <button onClick={() => this.quitarFav(this.props.id, "album")}>Quitar de favoritos</button> :
            <button onClick={() => this.agregarFav(this.props.id, "album")}>Agregar a favoritos</button>
        }
      </>
    );
  }
}

export default DetallesAlbum;