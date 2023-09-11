import React, { Component } from "react";

import { Link } from "react-router-dom";

import "./Card.css";

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            varMas : false,
            isFavorite: false
        }
    }

    componentDidMount() {
        let stringFavoritos = localStorage.getItem("favoritos-" + this.props.type);
        let arrayFavoritos = JSON.parse(stringFavoritos)

        if (arrayFavoritos) {
            this.setState({
                isFavorite: arrayFavoritos.includes(this.props.id)
            });
        }
    }

    toggleFavorite() {
        let stringFavoritos = localStorage.getItem("favoritos-" + this.props.type);
        let arrayFavoritos = JSON.parse(stringFavoritos)

        if (arrayFavoritos === null) {
            arrayFavoritos = [];
        } 

        if (this.state.isFavorite) {
            arrayFavoritos = arrayFavoritos.filter(id => id !== this.props.id)
        } else {
            arrayFavoritos.push(this.props.id);
        }

        let nuevoStringFavoritos = JSON.stringify(arrayFavoritos);
        localStorage.setItem("favoritos-" + this.props.type, nuevoStringFavoritos);

        this.setState({
            isFavorite: !this.state.isFavorite
        });
    }

    cambiarEstado() {
        this.setState({
            verMas: !this.state.verMas
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
                <button><Link to={"/detalle-" + this.props.type + "/" + this.props.id}>Ir al detalle</Link></button>
                <button onClick={() => this.toggleFavorite()}>{this.state.isFavorite ? "Quitar" : "Agregar"} a favoritos</button>
            </div>
        )
    }
}

export default Card;