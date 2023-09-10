import React, { Component } from "react";

import "./Buscador.css";

class Buscador extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search : ""
        }
    }

    guardarEstadoBusqueda(evento) {
        this.setState({
            search: evento.target.value
        })
    }

    envioFormulario(evento) {
        evento.preventDefault()
        console.log(this.state.search)
    }

    render() {
        return (
            <form onSubmit={(evento) => this.envioFormulario(evento)}>
                <input onChange={(evento) => this.guardarEstadoBusqueda(evento)} type="text" placeholder="Buscar..." value={this.state.search}/>
                <button type="submit">Buscar</button>
            </form>
        )
    }
}

export default Buscador;
