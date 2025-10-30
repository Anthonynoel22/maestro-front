
// Header en cours de chantier 
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "./Header.scss";
import clientIcon from "../../assets/images/user-client.svg";
import adminIcon from "../../assets/images/user-admin.svg";

function Header() {
    const [user, setUser] = useState(null);

    const commonLinks = [
        { label: "Accueil", to: "/" },
        { label: "Compositions", to: "/compositions" },
    ];
/* 
    const handleLogin = (role) => {
        if (role === "admin" || role === "client") {
            setUser({ role });
        } else {
            console.error("Rôle non reconnu :", role);
        }
    }; */

    const handleLogout = () => {
        setUser(null);
    };

    const iconSrc = user
        ? user.role === "admin"
            ? adminIcon
            : clientIcon
        : null;

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

                    {user ? (
                        <li>
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    id="dropdown-user"
                                    className="p-0 border-0 nav-icon-toggle"
                                >
                                    <img
                                        src={iconSrc}
                                        alt={
                                            user.role === "admin"
                                                ? "Icône admin"
                                                : "Icône client"
                                        }
                                        className="nav-icon"
                                    />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Header>
                                        Espace {user.role}
                                    </Dropdown.Header>

                                    {user.role === "admin" && (
                                        <Dropdown.Item as={Link} to="/admin">
                                            Tableau de bord
                                        </Dropdown.Item>
                                    )}

                                    {user.role === "client" && (
                                        <Dropdown.Item as={Link} to="/user">
                                            Mon espace
                                        </Dropdown.Item>
                                    )}

                                    <Dropdown.Divider />

                                    <Dropdown.Item onClick={handleLogout}>
                                        Se déconnecter
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Connexion / Inscription</Link>
                            </li>
{/*                             <li className="test-login">
                                <button onClick={() => handleLogin("client")}>
                                    Client Test
                                </button>
                                <button onClick={() => handleLogin("admin")}>
                                    Admin Test
                                </button>
                            </li> */}
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
