import React, { Component } from "react";

import Buscador from "../../components/Buscador/Buscador";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

import "./VerTodasCanciones.css";

class VerTodasCanciones extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cantidadCanciones: 10,
            arrayCanciones: [],
            searchTerm: "",
            loading: true
        }
    }

    componentDidMount() {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks?limit=10")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayCanciones: data.data,
                    loading: false
                })
            })
            .catch(err => console.log(err))
    }

    search(term) {
        this.setState({
            loading: true
        });

        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=track:" + term + "&limit=10")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayCanciones: data.data,
                    cantidadCanciones: 10,
                    loading: false
                })
            })
            .catch(err => console.log(err))
    }

    cargarMasCanciones() {
        this.setState({
            loading: true
        });

        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=track:" + this.state.searchTerm +  "&index=" + this.state.cantidadCanciones + "&limit=10")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayCanciones: this.state.arrayCanciones.concat(data.data),
                    cantidadCanciones: this.state.cantidadCanciones + data.data.length,
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
                    <h2>Todas las canciones</h2>
                    <section>
                        {
                            this.state.loading ? <Loader /> : this.state.arrayCanciones.map((cancion, i) => <Card key={i} id={cancion.id} cancion_title={cancion.title} cancion_album_cover={cancion.album.cover} cancion_artist_name={cancion.artist.name} type={"cancion"}/>)
                        }
                    </section>
                    <button onClick={() => this.cargarMasCanciones()}>Cargar más</button>
                </main>
            </>
        )
    }

}

export default VerTodasCanciones;