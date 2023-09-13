import React, { Component } from "react";

import Header from "../../components/Header/Header";
import Buscador from "../../components/Buscador/Buscador";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";

import "./Favoritos.css";

class Favoritos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayFavoritos : []
        }
    }

    componentDidMount() {
        let cancionesFavoritas = JSON.parse(localStorage.getItem("favoritos-cancion")) ?? [];
        let albumsFavoritos = JSON.parse(localStorage.getItem("favoritos-album")) ?? [];

        let arrayFavoritos = []

        cancionesFavoritas.map((id) => {
            fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/" + id)
                .then(response => response.json())
                .then(data => {
                    let objCancion = {
                        id: data.id,
                        imagen: data.album.cover,
                        titulo: data.title,
                        artista: data.artist.name,
                        album: data.album.title,
                        duracion: data.duration,
                        fecha: data.release_date,
                        tipo: "cancion"
                    }

                    arrayFavoritos.push(objCancion)

                    this.setState({
                        arrayFavoritos: arrayFavoritos
                    })
                })
                .catch(err => console.log(err))
        })


        albumsFavoritos.map((id) => {
            fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/" + id)
                .then(response => response.json())
                .then(data => {
                    let objAlbum = {
                        id: data.id,
                        imagen: data.cover,
                        titulo: data.title,
                        artista: data.artist.name,
                        fecha: data.release_date,
                        tipo: "album"
                    }

                    arrayFavoritos.push(objAlbum)

                    this.setState({
                        arrayFavoritos: arrayFavoritos
                    })
                })
                .catch(err => console.log(err))
        })

    }

    render() {
        return (
            <>
                <Header />
                <Buscador />
                <main className="favoritos">
                    {
                        this.state.arrayFavoritos.length === 0 ?
                        <p>Cargando...</p> :
                        this.state.arrayFavoritos.map((item, index) => <Card key={index} id={item.id} cancion_album_cover={item.imagen} cancion_title={item.titulo} cancion_artist_name={item.artista} album={item.album} duracion={item.duracion} fecha={item.fecha} type={item.tipo} />)
                    }
                </main>
                <Footer />
            </>
        )
    }
}

export default Favoritos;
