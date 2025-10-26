import React, { useState, useRef, useEffect } from "react";
import "./Header.scss";
import clientIcon from "../../assets/images/user-client.svg";
import adminIcon from "../../assets/images/user-admin.svg";

function Header() {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    //peut être modifiée sans provoquer de re-rendu du composant
    const menuRef = useRef(null);

    // constante pour tout les liens communs
    const commonLinks = [
        { label: "Accueil", href: "#" },
        { label: "Compositions", href: "#" },
    ];

    // fonction pour la connexion
    const handleLogin = (role) => {
        setUser({ role });
        setMenuOpen(false);
    };

    // fonction pour la deconnexion
    const handleLogout = () => {
        setUser(null);
        setMenuOpen(false);
    };
    // fonction du menu déroulant
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // ternaire qui signifie si on n'est connecté en tant que admin ou client
    
    const iconSrc = user
        ? user.role === "admin"
            ? adminIcon
            : clientIcon
        : null;

    return (
        <div>
            <header>
                <img src="logo.png" alt="logo maestro" />
                    <nav>
                        <ul>
                        {commonLinks.map((link, index) => (
                            <li key={index}>
                                <a href={link.href}>{link.label}</a>
                            </li>
                        ))}
{/* conditionnel user qui dis à la className "icon menu" quel user.role  
il aura avec une ternaire */}
                        {user && (
                            <li className="icon-menu" ref={menuRef}>
                                <img
                                    src={iconSrc}
                                    alt={
                                    user.role === "admin"
                                            ? "Icône admin"
                                            : "Icône client"
                                    }
                                    className="nav-icon"
                                    onClick={toggleMenu}
                                />
{/* conditionnel menuOpen qui dis à la className "dropdown-menu" quel {user role} 
on aura et bouton se déconnecter de la fonction handleLogin au clique on se déconnecte*/}
                                {menuOpen && (
                                    <div className="dropdown-menu">
                                        <p> Espace {user.role}</p>
                                        <button onClick={handleLogout}>
                                            Se déconnecter
                                        </button>
                                    </div>
                                )}
                            </li>
                        )}

                        {!user && (
                            <li>
                                <a href="#">Connexion / Inscription</a>
                            </li>
                        )}

{/*demo de simulation quand on clique sur l'icone admin ou client on se connecte*/}
{/*                 {!user && (
                    <div>
                            <img
                                src={clientIcon}
                                alt="Icône client"
                                onClick={() => handleLogin("client")}
                                />
                            <img
                                src={adminIcon}
                                alt="Icône admin"
                                onClick={() => handleLogin("admin")}
                                />
                        </div>
                    )}  */}
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Header;
