import "./Card.css";

function Card(props) {
    return (
        <div>
            <h2>{props.cancion_title}</h2>
            <img src={props.cancion_album_cover} alt={props.cancion_title} />
            <p>{props.cancion_artist_name}</p>
        </div>
    )
}

export default Card;