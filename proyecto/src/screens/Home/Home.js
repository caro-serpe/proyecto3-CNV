import React, { Component } from "react";

import "./Home.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Buscador from "../../components/Buscador/Buscador";
import SectionHome from "../../components/SectionHome/SectionHome";
import Loader from "../../components/Loader/Loader";

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayCanciones : [],
            arrayAlbumes : [],
            loadingAlbumes: true,
            loadingCanciones: true
        }
    }

    componentDidMount() {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks?limit=5")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayCanciones: data.data,
                    loadingCanciones: false
                })
            })
            .catch(err => console.log(err))

        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums?limit=5")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayAlbumes: data.data,
                    loadingAlbumes: false
                })
            })
            .catch(err => console.log(err))
    }

    search(term) {
        this.setState({
            loadingAlbumes: true,
            loadingCanciones: true
        });

        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=track:" + term + "&limit=5")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayCanciones: data.data,
                    loadingCanciones: false
                })
            })
            .catch(err => console.log(err))

        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=album:" + term + "&limit=5")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    arrayAlbumes: data.data,
                    loadingAlbumes: false
                })
            })
            .catch(err => console.log(err)) 
    }

    render() {
        return (
            <>
                <Buscador search={(term) => this.search(term)} />
                <main>
                    <h2>Top canciones</h2>
                    { this.state.loadingCanciones ? <Loader /> : <SectionHome arrayCanciones={this.state.arrayCanciones} /> }
                    <h2>Top álbumes</h2>
                    { this.state.loadingAlbumes ? <Loader /> : <SectionHome arrayAlbumes={this.state.arrayAlbumes} /> }
                </main>
            </>
        )
    }
}

export default Home;