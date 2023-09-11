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

        /*
        ** Aca estoy juntando AMBOS favoritos (canciones y albums) en un solo array
        ** para poder mostrarlos en la vista (a futuro estaria bueno diferenciarlos
        ** con un titulo o algo asi)
        */
        let arrayFavoritos = cancionesFavoritas.concat(albumsFavoritos);

        this.setState({
            arrayFavoritos : arrayFavoritos
        })
    }

    render() {
        return (
            <>
                <Header />
                <Buscador />
                <main className="favoritos">
                    {
                        this.state.arrayFavoritos.map((item, index) => <Card key={index} id={item.id} imagen={item.imagen} titulo={item.titulo} artista={item.artista} album={item.album} duracion={item.duracion} fecha={item.fecha} tipo={item.tipo} />)   
                    }
                </main>
                <Footer />
            </>
        )
    }
}

export default Favoritos;
