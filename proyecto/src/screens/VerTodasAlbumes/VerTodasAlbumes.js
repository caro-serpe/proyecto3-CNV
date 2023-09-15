import React, { Component } from "react";

import Header from "../../components/Header/Header";
import Buscador from "../../components/Buscador/Buscador";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

import "./VerTodasAlbumes.css";

class VerTodasAlbumes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cantidadAlbumes: 10,
            arrayAlbumes: [],
            searchTerm: "",
            loading: true
        }
    }

    componentDidMount() {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums?limit=10")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayAlbumes: data.data,
                    loading: false
                })
            })
            .catch(err => console.log(err))
    }

    search(term) {
        this.setState({
            loading: true
        });

        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=album:" + term + "&limit=10")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayAlbumes: data.data.map(album => {
                        return {
                            id: album.album.id,
                            title: album.album.title,
                            cover: album.album.cover,
                            artist: {
                                name: album.artist.name
                            }
                        }
                    }),
                    cantidadAlbumes: 10,
                    loading: false
                })
            })
            .catch(err => console.log(err))
    }

    cargarMasAlbumes() {
        this.setState({
            loading: true
        });

        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=album:" + this.state.searchTerm +  "&index=" + this.state.cantidadAlbumes + "&limit=10")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayAlbumes: this.state.arrayAlbumes.concat(data.data.map(album => {
                        return {
                            id: album.album.id,
                            title: album.album.title,
                            cover: album.album.cover,
                            artist: {
                                name: album.artist.name
                            }
                        }
                    })),
                    cantidadAlbumes: this.state.cantidadAlbumes + data.data.length,
                    loading: false
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <Buscador search={(term) => this.search(term)} setSearchTerm={(term) => this.setState({ searchTerm: term })} />
                <main className="ver-todas">
                    <h2>Todos los albums</h2>
                    <section>
                        {
                            this.state.loading ? <Loader /> : this.state.arrayAlbumes.map((album, i) => <Card key={i} id={album.id} cancion_title={album.title} cancion_album_cover={album.cover} cancion_artist_name={album.artist.name} type={"album"}/>)
                        }
                    </section>
                    <button onClick={() => this.cargarMasAlbumes()}>Cargar más</button>
                </main>
            </>
        )
    }

}

export default VerTodasAlbumes;