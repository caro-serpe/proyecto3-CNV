import React, { Component } from "react";

import "./Home.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Buscador from "../../components/Buscador/Buscador";
import Card from "../../components/Card/Card";

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

        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums?limit=5")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayAlbumes: data.data
                })
            })
            .catch(err => console.log(err))
    }

    search(term) {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=track:" + term + "&limit=5")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayCanciones: data.data
                })
            })
            .catch(err => console.log(err))

        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=album:" + term + "&limit=5")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayAlbumes: data.data
                })
            })
            .catch(err => console.log(err)) 
    }

    render() {
        return (
            <>
                <Header />
                <Buscador search={this.search.bind(this)} />
                <main>
                    <h2>Top canciones</h2>
                    <section>
                        {
                            this.state.arrayCanciones.map((cancion, i) => <Card key={i} id={cancion.id} cancion_title={cancion.title} cancion_album_cover={cancion.album.cover} cancion_artist_name={cancion.artist.name} type={"cancion"}/>)
                        }
                    </section>
                    <h2>Top álbumes</h2>
                    <section>
                        {
                            this.state.arrayAlbumes.map((album, i) => <Card key={i} id={album.id} cancion_title={album.title} cancion_album_cover={album.cover} cancion_artist_name={album.artist.name} type={"album"}/>)
                        }
                    </section>
                </main>
                <Footer />
            </>
        )
    }
}

export default Home;