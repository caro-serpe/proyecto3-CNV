import React, { Component } from "react";

import "./Home.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Buscador from "../../components/Buscador/Buscador";
import SectionHome from "../../components/SectionHome/SectionHome";

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
                <Buscador search={this.search.bind(this)} />
                <main>
                    <h2>Top canciones</h2>
                    <SectionHome arrayCanciones={this.state.arrayCanciones} />
                    <h2>Top álbumes</h2>
                    <SectionHome arrayAlbumes={this.state.arrayAlbumes} />
                </main>
            </>
        )
    }
}

export default Home;