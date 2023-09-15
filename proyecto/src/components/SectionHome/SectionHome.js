import React, { Component } from "react";

import Card from "../Card/Card";

import "./SectionHome.css";

class SectionHome extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return (
			<section>
				{
					this.props.arrayCanciones ?
					<>
						{
		                    this.props.arrayCanciones.map((cancion, i) => <Card key={i} id={cancion.id} cancion_title={cancion.title} cancion_album_cover={cancion.album.cover} cancion_artist_name={cancion.artist.name} type={"cancion"}/>)
		                }
		            </> :
					<>
		                {
		                    this.props.arrayAlbumes.map((album, i) => <Card key={i} id={album.id} cancion_title={album.title} cancion_album_cover={album.cover} cancion_artist_name={album.artist.name} type={"album"}/>)
		                }
		            </>
			            
				}
			</section>
		)
	}
}

export default SectionHome;
