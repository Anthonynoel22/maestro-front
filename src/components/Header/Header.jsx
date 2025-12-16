import  { useContext } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import clientIcon from "../../assets/images/user-client.svg";
import adminIcon from "../../assets/images/user-admin.svg";
import UserContext from "../../UserContext.jsx";
import { logoutUser } from "../../api/apiUser.js";
import { useAxiosInterceptor } from "../../api/axiosConfig.js";
import { notify } from "../Toast/Toast.jsx";
import logo from "../../assets/images/logo.png";
import "./Header.scss";

function Header() {
    const { userIs, logoutProvider } = useContext(UserContext);
    const navigate = useNavigate();

    // active l'interceptor du axios config
    useAxiosInterceptor();

    const commonLinks = [
        { label: "Accueil", to: "/" },
        { label: "Compositions", to: "/compositions" },
    ];

    /* Se déconnecter */
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

    const iconSrc =
        userIs === "admin"
            ? adminIcon
            : userIs === "client"
            ? clientIcon
            : null;

    return (
        <header role="banner">
            <a href="/">
                <img
                    src={logo}
                    alt="logo maestro"
                    className="logo"
                />
            </a>
            <nav role="navigation" aria-label="Navigation principale du site">
                <ul className="nav-list" role="menubar">
                    {commonLinks.map((link, index) => (
                        <li key={index}>
                            <Link to={link.to} role="menu" tabIndex={0}>
                                {link.label}
                            </Link>
                        </li>
                    ))}

                    {userIs !== "visitor" ? (
                        <li>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="link"
                                    id="dropdown-user"
                                    className="p-0 border-0 nav-icon-toggle"
                                    aria-label={`Menu utilisateur ${userIs}`}
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

                                <Dropdown.Menu
                                    role="menu"
                                    aria-label={`Menu ${userIs}`}
                                >
                                    <Dropdown.Header as="div" role="presentation">
                                        Espace {userIs}
                                    </Dropdown.Header>

                                    {userIs === "admin" && (
                                        <Dropdown.Item as={Link} to="/admin" role="menu" tabIndex={0}>
                                            Mon espace
                                        </Dropdown.Item>
                                    )}

                                    {userIs === "client" && (
                                        <Dropdown.Item as={Link} to="/user" role="menu" tabIndex={0}>
                                            Mon espace
                                        </Dropdown.Item>
                                    )}

                                    <Dropdown.Divider role="separator" />

                                    <Dropdown.Item as={Link} to="/user/settings" role="menu" tabIndex={0}>
                                        Paramètre de compte
                                    </Dropdown.Item>

                                    <Dropdown.Divider role="separator" />

                                    <Dropdown.Item onClick={handleLogout} role="menu" tabIndex={0}>
                                        Se déconnecter
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    ) : (
                        <li>
                            <Link
                                to="/login"
                                role="menu"
                                tabIndex={0}
                                aria-label="Accéder à la page de connexion ou d'inscription"
                            >
                                Connexion / Inscription
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;