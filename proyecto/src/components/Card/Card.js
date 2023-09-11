import React, { Component } from "react";

import { Link } from "react-router-dom";

import "./Card.css";

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            varMas : false,
            arrayFavoritos : []
        }
    }

    componentDidMount() {
        let stringFavoritos = localStorage.getItem("favoritos")
        let arrayFavoritos = JSON.parse(stringFavoritos)

        if (arrayFavoritos === null) {
            arrayFavoritos = []
        } else {
            this.setState({
                arrayFavoritos: arrayFavoritos
            })
        }
    }

    cambiarEstado() {
        this.setState({
            verMas: !this.state.verMas
        })
    }

    agregarFavorito(id) {
        let stringFavoritos = localStorage.getItem("favoritos")
        let arrayFavoritos = JSON.parse(stringFavoritos)

        if (arrayFavoritos === null) {
            arrayFavoritos = []
        }

        arrayFavoritos.push(id)

        let nuevoStringFavoritos = JSON.stringify(arrayFavoritos)

        localStorage.setItem("favoritos", nuevoStringFavoritos)

        this.setState({
            arrayFavoritos: arrayFavoritos
        })
    }

    quitarFavorito(id) {
        let stringFavoritos = localStorage.getItem("favoritos")
        let arrayFavoritos = JSON.parse(stringFavoritos)

        if (arrayFavoritos === null) {
            arrayFavoritos = []
        }

        let arrayFavoritosFiltrado = arrayFavoritos.filter(favorito => favorito !== id)

        let nuevoStringFavoritos = JSON.stringify(arrayFavoritosFiltrado)

        localStorage.setItem("favoritos", nuevoStringFavoritos)

        this.setState({
            arrayFavoritos: arrayFavoritosFiltrado
        })
    }

    render() {
        return (
            <div className="tarjetaCancion">
                <img src={this.props.cancion_album_cover} alt={this.props.cancion_title} />
                <h6>{this.props.cancion_title}</h6>
                {
                    this.state.verMas ?
                    <>
                        <p>Descripción</p>
                        <div>
                            <p>Artista: {this.props.cancion_artist_name}</p>
                        </div>
                    </> :
                    null
                }
                {
                    this.state.verMas ?
                    <button onClick={() => this.cambiarEstado()}>Ver menos</button> :
                    <button onClick={() => this.cambiarEstado()}>Ver más</button>
                }
                <button><Link to={"/detalle/" + this.props.id}>Ir al detalle</Link></button>
                {
                    this.state.arrayFavoritos.includes(this.props.id) ?
                    <button onClick={() => this.quitarFavorito(this.props.id)}>Quitar de favoritos</button> :
                    <button onClick={() => this.agregarFavorito(this.props.id)}>Agregar a favoritos</button>
                }
            </div>
        )
    }
}

export default Card;