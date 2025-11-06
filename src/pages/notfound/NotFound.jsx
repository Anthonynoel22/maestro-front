import { Link } from "react-router-dom";
import "./NotFound.scss";

function NotFound() {
    return (
        <div className="notfound-container">
            <h1>404</h1>
            <h2>Page non trouvée</h2>
            <p>La page que vous rechercher est introuvable</p>
            <Link to="/">Retour à l'accueil</Link>
        </div>

    )
}


export default NotFound;