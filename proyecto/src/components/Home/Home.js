import React, { Component } from "react";

import "./Home.css";

import Card from "../Card/Card";

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayCanciones : [],
            arrayAlbumes : []
        }
    }

    componentDidMount() {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks?limit=5")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayCanciones: data.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <main>
                {
                    this.state.arrayCanciones.map((cancion, i) => <Card key={i} cancion_title={cancion.title} cancion_album_cover={cancion.album.cover} cancion_artist_name={cancion.artist.name} />)
                }
            </main>
        )
    }
}

export default Home;