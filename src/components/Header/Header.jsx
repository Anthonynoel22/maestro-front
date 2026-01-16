import { useContext } from "react";
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

    // Active l’intercepteur global axios
    useAxiosInterceptor();

    const commonLinks = [
        { label: "Accueil", to: "/" },
        { label: "Compositions", to: "/compositions" },
    ];

    async function handleLogout() {
        try {
            await logoutUser();
            logoutProvider();
            notify("Vous êtes déconnecté.");
            navigate("/");
        } catch (error) {
            console.error("Erreur logout :", error);
        }
    }

    const iconSrc =
        userIs === "admin"
            ? adminIcon
            : userIs === "client"
            ? clientIcon
            : null;

    return (
        <header className="header" role="banner">
            <a href="/" className="header__logo-link">
                <img
                    src={logo}
                    alt="logo Maestro"
                    className="header__logo"
                />
            </a>

            <nav
                className="header__nav"
                role="navigation"
                aria-label="Navigation principale du site"
            >
                <ul className="nav-list" role="menubar">
                    {commonLinks.map((link, index) => (
                        <li key={index} className="nav-list__item">
                            <Link to={link.to} className="nav-list__link" role="menuitem">
                                {link.label}
                            </Link>
                        </li>
                    ))}

                    {userIs !== "visitor" ? (
                        <li className="nav-list__item nav-list__dropdown">
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="link"
                                    id="dropdown-user"
                                    className="nav-icon-toggle"
                                    aria-label={`Menu utilisateur ${userIs}`}
                                >
                                    <img
                                        src={iconSrc}
                                        alt={`Icône ${userIs}`}
                                        className="nav-icon"
                                    />
                                </Dropdown.Toggle>

                                <Dropdown.Menu
                                    className="user-menu"
                                    role="menu"
                                    aria-label={`Menu ${userIs}`}
                                >
                                    <Dropdown.Header
                                        as="div"
                                        className="user-menu__header"
                                    >
                                        Espace {userIs}
                                    </Dropdown.Header>

                                    {userIs === "admin" && (
                                        <Dropdown.Item
                                            as={Link}
                                            to="/admin"
                                            className="user-menu__link"
                                        >
                                            Mon espace
                                        </Dropdown.Item>
                                    )}

                                    {userIs === "client" && (
                                        <Dropdown.Item
                                            as={Link}
                                            to="/user"
                                            className="user-menu__link"
                                        >
                                            Mon espace
                                        </Dropdown.Item>
                                    )}

                                    <Dropdown.Divider />

                                    <Dropdown.Item
                                        as={Link}
                                        to="/user/settings"
                                        className="user-menu__link"
                                    >
                                        Paramètre de compte
                                    </Dropdown.Item>

                                    <Dropdown.Divider />

                                    <Dropdown.Item
                                        onClick={handleLogout}
                                        className="user-menu__link"
                                    >
                                        Se déconnecter
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    ) : (
                        <li className="nav-list__item">
                            <Link
                                to="/login"
                                className="nav-list__link"
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
