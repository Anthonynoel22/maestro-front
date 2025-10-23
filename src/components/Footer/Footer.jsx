import React from "react";
import './Footer.scss';

const links = [
    { label: "Nous contacter", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
    { label: "Informations légales", href: "#" },
    { label: "CGU", href: "#" },
    { label: "Accessibilité", href: "#" },
];

function Footer() {
    return (
        <footer>
            <nav>
                <ul>
                    {links.map((link, index) => (
                        <li key={index}>
                            <a href={link.href}>{link.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;