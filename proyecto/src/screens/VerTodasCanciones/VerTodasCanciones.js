import React, { Component } from "react";

import Header from "../../components/Header/Header";
import Buscador from "../../components/Buscador/Buscador";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";

import "./VerTodasCanciones.css";

class VerTodasCanciones extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cantidadCanciones: 10,
            arrayCanciones: [],
            stringFiltro: "",
            arrayCancionesFiltradas: []
        }
    }

    componentDidMount() {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayCanciones: data.data
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

        let arrayCancionesFiltradas = this.state.arrayCanciones.filter(cancion => cancion.title.toLowerCase().includes(this.state.stringFiltro.toLowerCase()))

        this.setState({
            arrayCancionesFiltradas: arrayCancionesFiltradas
        })
    }

    cargarMasCanciones = () => {
        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks?limit=${this.state.cantidadCanciones + 10}`)
            .then(res => res.json())
            .then(data => {
                const arrayNuevasCanciones = data.data ? data.data.slice(this.state.cantidadCanciones, this.state.cantidadCanciones + 10) : [];
    
                this.setState(prevState => ({
                    arrayCanciones: [...prevState.arrayCanciones, ...arrayNuevasCanciones],
                    cantidadCanciones: prevState.cantidadCanciones + 10
                }));
    
                if (!data.data || data.data.length === 0) {
                    console.log("No hay más elementos para cargar.");
                }
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <>
                <form className="filtrar" onSubmit={(evento) => this.filtrarCanciones(evento)}>
                    <h6>Filtrar</h6>
                    <input onChange={(evento) => this.guardarFiltro(evento)} type="text" placeholder="Buscar..." value={this.state.stringFiltro} />
                    <button type="submit">Filtrado</button>
                </form>
                <main className="ver-todas">
                    <h2>Todas las canciones</h2>
                    <section>
                        {
                            this.state.arrayCancionesFiltradas.length > 0 ?
                            <>
                                {
                                    this.state.arrayCancionesFiltradas.map((cancion, i) => <Card key={i} id={cancion.id} cancion_title={cancion.title} cancion_album_cover={cancion.album.cover} cancion_artist_name={cancion.artist.name} />)
                                }
                            </> : 
                            <>
                                {
                                    this.state.arrayCanciones.map((cancion, i) => <Card key={i} id={cancion.id} cancion_title={cancion.title} cancion_album_cover={cancion.album.cover} cancion_artist_name={cancion.artist.name} />)
                                }
                            </>
                        }

                    </section>
                    <button onClick={() => this.cargarMasCanciones()}>Cargar más</button>
                </main>
            </>
        )
    }

}

export default VerTodasCanciones;
