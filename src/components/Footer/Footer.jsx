// Footer.jsx
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import UserContext from "../../UserContext.jsx";
import "./Footer.scss";
import { logoutUser } from "../../api/apiUser.js";
import { getMyProfile } from "../../api/apiUser.js";
import { useAxiosInterceptor } from "../../api/axiosConfig.js";


function Footer() {
    const { userIs, logoutProvider, loginProvider } = useContext(UserContext);
    const navigate = useNavigate();

     useAxiosInterceptor();
    
        // Cette fonction peut être utilisée pour rafraîchir
        //  le contexte utilisateur si nécessaire
        async function refreshContext() {
    
            // si getMyProfile réussit, on met à jour le contexte
            const profile = await getMyProfile();
    
            if (profile) {
                loginProvider(profile.user.role);
            }
        }
    
        //ajout pour gestion de la perte de contexte utilisateur
        useEffect(() => {
            console.log("userIs changed:", userIs);
    
            // Si le rôle devient "visitor", 
            // on tente de rafraîchir le contexte
            if (userIs === "visitor") {
            console.log("userIs lost:", userIs);
            refreshContext();
            }
            // autre action à chaque changement de rôle...
        }, [userIs]);
        
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

    async function handleLogout () {
        try {
            await logoutUser(); // deconnexion de user
            logoutProvider(); // retourne à l'état de visiteur
            navigate("/"); // redirection vers la page d'accueil
        } catch (error) {
            console.log("erreur logout :", error);
        }
    };

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
                                <Dropdown.Divider/>
                                {userIs === "client" && (
                                    <Dropdown.Item as={Link} to="/user">
                                        Mon espace
                                    </Dropdown.Item>
                                )}
                                <Dropdown.Divider/>
                                <Dropdown.Item as={Link} to="/user/settings">
                                    Paramètre de compte
                                </Dropdown.Item>

                                <Dropdown.Divider/>

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
