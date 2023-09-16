import React, { Component } from "react";

import Header from "../../components/Header/Header";
import Buscador from "../../components/Buscador/Buscador";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

import "./Favoritos.css";

class Favoritos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayFavoritos : [],
            loadingAlbums: true,
            loadingCanciones: true
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
                        arrayFavoritos: arrayFavoritos,
                        loadingCanciones: false
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
                        arrayFavoritos: arrayFavoritos,
                        loadingAlbums: false
                    })
                })
                .catch(err => console.log(err))
        })

        // si no hay favoritos, apaga el loader
        if (cancionesFavoritas.length === 0) {
            this.setState({
                loadingCanciones: false
            })
        }

        if (albumsFavoritos.length === 0) {
            this.setState({
                loadingAlbums: false
            })
        }
    }
    search(term) {
        // busca en el array de favoritos
        let arrayFavoritos = this.state.arrayFavoritos.filter((item) => {
            return item.titulo.toLowerCase().includes(term.toLowerCase())
        })

        this.setState({
            arrayFavoritos: arrayFavoritos
        })
    }

    render() {
        return (
            <>
                <Buscador search={(term) => this.search(term)} />
                <main className="favoritos">
                    {
                        this.state.loadingAlbums || this.state.loadingCanciones ?
                        <Loader /> :
                        this.state.arrayFavoritos.map((item, index) => <Card key={index} id={item.id} cancion_album_cover={item.imagen} cancion_title={item.titulo} cancion_artist_name={item.artista} album={item.album} duracion={item.duracion} fecha={item.fecha} type={item.tipo} className="card"/>)
                    }
                </main>
            </>
        )
    }
}

export default Favoritos;
