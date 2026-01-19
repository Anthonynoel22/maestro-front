import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import UserContext from "../../UserContext.jsx";
import { logoutUser } from "../../api/apiUser.js";
import { notify } from "../Toast/Toast.jsx";
import "./Footer.scss";

function Footer() {
    const links = [
        { label: "Nous contacter", to: "/contact" },
        { label: "Informations légales", to: "/legales" },
        { label: "CGU", to: "/cgu" },
        { label: "Accessibilité", to: "/accessibility" },
    ];
    
    const mobileLinks = [{ label: "Compositions", to: "/compositions" }, ...links];

    const { userIs, logoutProvider } = useContext(UserContext);
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logoutUser();
            logoutProvider();
            notify("Vous êtes déconnecté.");
            navigate("/");
        } catch (error) {
            console.log("erreur logout :", error);
        }
    }

    return (
        <footer className={`footer ${userIs}`} aria-label="Pied de page principal du site">
            <nav aria-label="Navigation pied de page" tabIndex={0}>
                <ul className="footer-links" role="navigation" aria-label="Liens utiles en pied de page" tabIndex={0}>
                    {links.map((link, index) => (
                        <li key={index}>
                            <NavLink 
                                to={link.to}
                                tabIndex={0}
                                aria-label={`Accéder à la section ${link.label}`}
                                className={({ isActive }) =>
                                    `footer-link ${isActive ? "footer-link--active" : ""}`
                                }
                            >  
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Barre d'icônes mobile */}
            <ul className="footer-icons" aria-label="Navigation rapide pied de page" tabIndex={0}>
                <li>
                    <NavLink to="/" tabIndex={0} aria-label="Page d'accueil" end>
                        <i className="bi bi-house"></i>
                        <span>Accueil</span>
                    </NavLink>
                </li>

                {userIs === "visitor" ? (
                    <li>
                        <NavLink to="/login" tabIndex={0} aria-label="Espace personnel">
                            <i className="bi bi-person"></i>
                            <span>Connexion</span>
                        </NavLink>
                    </li>
                ) : (
                    <li>
                        <Dropdown>
                            <Dropdown.Toggle
                                as={Link}
                                tabIndex={0}
                                className={`menu-toggle person-icon ${userIs}`}
                                aria-label="Menu utilisateur pied de page"
                            >
                                <i className="bi bi-person"></i>
                                <span>Connecté</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu aria-label={`Menu utilisateur ${userIs}`} role="menu">
                                <Dropdown.Header>
                                    Espace {userIs}
                                </Dropdown.Header>
                                {userIs === "admin" && (
                                    <Dropdown.Item as={NavLink} to="/admin" end tabIndex={0} aria-label="Espace administrateur">
                                        Mon espace
                                    </Dropdown.Item>
                                )}
                                {userIs === "client" && (
                                    <Dropdown.Item as={NavLink} to="/user" end tabIndex={0} aria-label="Espace client">
                                        Mon espace
                                    </Dropdown.Item>
                                )}
                                <Dropdown.Divider role="separator" />
                                <Dropdown.Item as={NavLink} to="/user/settings" end tabIndex={0} aria-label="Paramètre de compte">
                                    Paramètre de compte
                                </Dropdown.Item>
                                <Dropdown.Divider role="separator" />
                                <Dropdown.Item onClick={handleLogout} tabIndex={0} aria-label="Déconnexion">
                                    Se déconnecter
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                )}

                {/* Menu des liens pour mobiles */}
                <li>
                    <Dropdown>
                        <Dropdown.Toggle
                            as={Link}
                            to="#"
                            className="menu-toggle"
                            tabIndex={0}
                            aria-label="Menu des liens pied de page"
                        >
                            <i className="bi bi-list"></i>
                            <span>Liens</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu aria-label="Menu des liens" role="menu">
                            {mobileLinks.map((link, index) => (
                                <Dropdown.Item
                                    as={NavLink}
                                    to={link.to}
                                    key={index}
                                    tabIndex={0}
                                    aria-label={`Accéder à la section ${link.label}`}
                                    className={({ isActive }) =>
                                        `dropdown-item ${isActive ? "footer-dropdown-active" : ""}`
                                    }
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