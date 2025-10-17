import React from "react";
import './Header.scss';

function Header() {
    return (
        <header>
            <img src="logo.png" alt="logo maestro"/>
            <nav>
                <ul>
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">Compositions</a></li>
                    <li><a href="#">Inscription/Connexion</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;