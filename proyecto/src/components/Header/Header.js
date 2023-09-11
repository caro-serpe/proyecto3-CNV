import { Link } from "react-router-dom";
import "./Header.css"

function Header() {
    return (
        <header>
            <h1>Mi proyecto</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/favoritos">Favoritos</Link></li>
                    <li><Link to="/ver-canciones">Ver todas las canciones</Link></li>
                    <li><Link to="/ver-albumes">Ver todos los álbumes</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
