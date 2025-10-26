import React from "react";
import { Dropdown } from "react-bootstrap";
import "./Footer.scss";

const links = [
    { label: "Nous contacter", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
    { label: "Informations légales", href: "#" },
    { label: "CGU", href: "#" },
    { label: "Accessibilité", href: "#" },
];

// avec le spread operator je cree un nouveau tableau a partir du tableauu initial
const mobileLinks = [{ label: "Compositions", href: "#" }, ...links];

function Footer() {
    return (
        <footer className="footer">
            <nav>
                <ul className="footer-links">
                    {links.map((link, index) => (
                        <li key={index}>
                            <a href={link.href}>{link.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>

            <ul className="footer-icons">
                <li>
                    <a href="#" aria-label="Page d’accueil">
                        <i className="bi bi-house"></i>
                        <span>Accueil</span>
                    </a>
                </li>
                <li>
                    <a href="#" aria-label="Espace personnel">
                        <i className="bi bi-person"></i>
                        <span>Connexion</span>
                    </a>
                </li>
                <li>
                    <Dropdown>
                        <Dropdown.Toggle
                            as="a"
                            href="#"
                            className="menu-toggle"
                            aria-label="Menu des liens"
                        >
                            <i className="bi bi-list"></i>
                            <span>Liens</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {mobileLinks.map((link, index) => (
                                <Dropdown.Item key={index} href={link.href}>
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
