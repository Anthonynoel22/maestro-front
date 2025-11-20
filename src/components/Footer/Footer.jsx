// Footer.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import UserContext from "../../UserContext.jsx";
import "./Footer.scss";
import { logoutUser } from "../../api/apiUser.js";
import { notify } from "../Toast/Toast.jsx";

const links = [
    { label: "Nous contacter", to: "/contact" },
    { label: "Informations légales", to: "/legales" },
    { label: "CGU", to: "/cgu" },
    { label: "Accessibilité", to: "/accessibility" },
];

/* Tableau des liens pour mobile.
Il commence par un lien supplémentaire "Compositions", 
puis inclut tous les liens précédents grâce à l’opérateur spread (...). */

const mobileLinks = [{ label: "Compositions", to: "/compositions" }, ...links];

function Footer() {
    const { userIs, logoutProvider } = useContext(UserContext);
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logoutUser(); // deconnexion de user
            logoutProvider(); // retourne à l'état de visiteur
            notify("Vous êtes déconnecté.");
            navigate("/"); // redirection vers la page d'accueil
        } catch (error) {
            console.log("erreur logout :", error);
        }
    }

    return (
        <footer className={`footer ${userIs}`}>
            <nav>
                <ul className="footer-links">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link to={link.to}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Barre d'icônes mobile */}
            <ul className="footer-icons">
                <li>
                    <Link to="/" aria-label="Page d’accueil">
                        <i className="bi bi-house"></i>
                        <span>Accueil</span>
                    </Link>
                </li>

                {userIs === "visitor" ? (
                    <li>
                        <Link to="/login" aria-label="Espace personnel">
                            <i className="bi bi-person"></i>
                            <span>Connexion</span>
                        </Link>
                    </li>
                ) : (
                    <li>
                        <Dropdown>
                            <Dropdown.Toggle
                                as={Link}
                                className={`menu-toggle person-icon ${userIs}`}
                                aria-label="Menu utilisateur"
                            >
                                <i className="bi bi-person"></i>
                                <span>Connecté</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Header>
                                    Espace {userIs}
                                </Dropdown.Header>

                                {userIs === "admin" && (
                                    <Dropdown.Item as={Link} to="/admin">
                                        Mon espace
                                    </Dropdown.Item>
                                )}
                                <Dropdown.Divider />
                                {userIs === "client" && (
                                    <Dropdown.Item as={Link} to="/user">
                                        Mon espace
                                    </Dropdown.Item>
                                )}
                                <Dropdown.Divider />
                                <Dropdown.Item as={Link} to="/user/settings">
                                    Paramètre de compte
                                </Dropdown.Item>

                                <Dropdown.Divider />

                                <Dropdown.Item onClick={handleLogout}>
                                    Se déconnecter
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                )}

                {/* Menu des liens pour mobiles*/}
                <li>
                    <Dropdown>
                        <Dropdown.Toggle
                            as={Link}
                            to="#"
                            className="menu-toggle"
                            aria-label="Menu des liens"
                        >
                            <i className="bi bi-list"></i>
                            <span>Liens</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {mobileLinks.map((link, index) => (
                                <Dropdown.Item
                                    as={Link}
                                    to={link.to}
                                    key={index}
                                >
                                    {link.label}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;
