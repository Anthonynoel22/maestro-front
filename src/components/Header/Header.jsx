// Header.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import clientIcon from "../../assets/images/user-client.svg";
import adminIcon from "../../assets/images/user-admin.svg";
import UserContext from "../../UserContext.jsx";
import "./Header.scss";

/*useContext(UserContext) récupère les données partagées dans le contexte utilisateur.
userIs : indique le rôle actuel (admin, client, visitor).
logoutProvider : fonction pour déconnecter l’utilisateur.
useNavigate() retourne une fonction navigate pour effectuer une redirection.*/
function Header() {
    const { userIs, logoutProvider } = useContext(UserContext);
    const navigate = useNavigate();

    const commonLinks = [
        { label: "Accueil", to: "/" },
        { label: "Compositions", to: "/compositions" },
        { label: "user", to: "/user"},
    ];

/* Lorsqu’on clique sur « Se déconnecter », cette fonction :
Appelle logoutProvider() pour ce déconnecté à la session utilisateur.
Redirige vers la page d’accueil.*/
    const handleLogout = () => {
        logoutProvider();
        navigate("/"); 
    };

/* Si l’utilisateur est admin affiche adminIcon.
Si client affiche clientIcon.
Si visiteur  pas d’icône.
 */
    const iconSrc =
        userIs === "admin"
            ? adminIcon
            : userIs === "client"
            ? clientIcon
            : null;

            /* .map qui affiche les liens dynamiquement */
    return (
        <header>
            <img src="logo.png" alt="logo maestro" className="logo" />
            <nav>
                <ul className="nav-list">
                    {commonLinks.map((link, index) => (
                        <li key={index}>
                            <Link to={link.to}>{link.label}</Link>
                        </li>
                    ))}

                    {userIs !== "visitor" ? (
                        <li>
                            <Dropdown >
                                <Dropdown.Toggle
                                    variant="link"
                                    id="dropdown-user"
                                /*    p-0 "padding 0"
                                    border-0 pas de bordure
                                    pour basculer nav-icon-toggle */
                                    className="p-0 border-0 nav-icon-toggle"
                                >
                                    <img
                                        src={iconSrc}
                                        alt={
                                            userIs === "admin"
                                                ? "Icône admin"
                                                : "Icône client"
                                        }
                                        className="nav-icon"
                                    />
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
                    ) : (
                        /* si on n'est pas connecté on affiche le lien connexion/inscription. */
                        <li>
                            <Link to="/login">Connexion / Inscription</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
