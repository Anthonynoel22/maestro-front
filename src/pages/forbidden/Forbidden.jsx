import {Link} from "react-router-dom";
import "./Forbidden.scss";

function Forbidden() {
    return (
        <div className="forbidden-main">
            <h1 className="forbidden-title">403</h1>
            <h2 className="forbidden-subtitle">Page interdite</h2>
            <p className="forbidden-text">L'accès à cette page vous est interdit</p>
            <div className="forbidden-link">
            <Link to="/">Retour à l'accueil</Link>
            </div>
        </div>
    );
}

export default Forbidden;