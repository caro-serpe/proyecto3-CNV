import React, { Component } from "react";

import Header from "../../components/Header/Header";
import Buscador from "../../components/Buscador/Buscador";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";

import "./VerTodasAlbumes.css";

class VerTodasAlbumes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cantidadAlbumes: 10,
            arrayAlbumes: [],
            stringFiltro: "",
            arrayAlbumesFiltrados: []
        }
    }

    componentDidMount() {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayAlbumes: data.data
                })
            })
            .catch(err => console.log(err))
    }

    guardarFiltro(evento) {
        this.setState({
            stringFiltro: evento.target.value
        })
    }

    filtrarCanciones(evento) {
        evento.preventDefault()

        let arrayAlbumesFiltrados = this.state.arrayAlbumes.filter(album => album.title.toLowerCase().includes(this.state.stringFiltro.toLowerCase()))

        this.setState({
            arrayAlbumesFiltrados: arrayAlbumesFiltrados
        })
    }

    cargarMasAlbumes() {
        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums?limit=${this.state.cantidadAlbumes + 10}`)
            .then(res => res.json())
            .then(data => {

                // Quiero agregar las últimas 10 canciones que me llegan a las que tenemos en arrayCanciones del estado

                let arrayNuevosAlbumes = []

                for (let i = this.state.cantidadAlbumes; i < this.state.cantidadAlbumes + 10; i++) {
                    arrayNuevosAlbumes.push(data.data[i])
                }

                this.setState({
                    arrayAlbumes: this.state.arrayAlbumes.concat(arrayNuevosAlbumes),
                    cantidadAlbumes: this.state.cantidadAlbumes + 10
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <Header />
                <Buscador />
                <form className="filtrar" onSubmit={(evento) => this.filtrarCanciones(evento)}>
                    <h6>Filtrar</h6>
                    <input onChange={(evento) => this.guardarFiltro(evento)} type="text" placeholder="Buscar..." value={this.state.stringFiltro} />
                    <button type="submit">Filtrar</button>
                </form>
                <main className="ver-todas">
                    <h2>Todos los albums</h2>
                    <section>
                        {
                            this.state.arrayAlbumesFiltrados.length > 0 ?
                            <>
                                {
                                    this.state.arrayAlbumesFiltrados.map((album, i) => <Card key={i} id={album.id} cancion_title={album.title} cancion_album_cover={album.cover} cancion_artist_name={album.artist.name} />)
                                }
                            </> :
                            <>
                                {
                                    this.state.arrayAlbumes.map((album, i) => <Card key={i} id={album.id} cancion_title={album.title} cancion_album_cover={album.cover} cancion_artist_name={album.artist.name} />)
                                }
                            </>
                        }
                    </section>
                    <button onClick={() => this.cargarMasAlbumes()}>Cargar más</button>
                </main>
                <Footer />
            </>
        )
    }

}

export default VerTodasAlbumes;