import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "./Footer.scss";

const links = [
    { label: "Nous contacter", to: "/contact" },
    /* { label: "Politique de confidentialité", to: "/confidentialite" }, */
    { label: "Informations légales", to: "/legales" },
    { label: "CGU", to: "/cgu" },
    { label: "Accessibilité", to: "/accessibilite" },
];

const mobileLinks = [{ label: "Compositions", to: "/compositions" }, ...links];

function Footer() {
    return (
        <footer className="footer">
            <nav>
                <ul className="footer-links">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link to={link.to}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <ul className="footer-icons">
                <li>
                    <Link to="/" aria-label="Page d’accueil">
                        <i className="bi bi-house"></i>
                        <span>Accueil</span>
                    </Link>
                </li>
                <li>
                    <Link to="/login" aria-label="Espace personnel">
                        <i className="bi bi-person"></i>
                        <span>Connexion</span>
                    </Link>
                </li>
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
