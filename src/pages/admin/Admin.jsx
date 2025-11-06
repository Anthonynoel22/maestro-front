import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ContactRequestList from "../../components/ContactRequestList/ContactRequestList.jsx";
import ProjectList from "../../components/ProjectList/ProjectList.jsx";
import ClientList from "../../components/ClientList/ClientList.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Admin.scss";
import GenreList from "../../components/GenresList.jsx";
import WaitingProjectList from "../../components/WaitingProjectList/WaitingProjectList.jsx";
import ClientCard from "../../components/ClientList/Clientcard/ClientCard.jsx";
import FullClientCard from "../../components/ClientList/FullClientCard.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { getAllUsers } from "../../api/apiUser.js";
import { getAllCompany } from "../../api/apiCompany.js";

function Admin() {
    // LES COMPOSANTS QUI SERONT SUR LA PAGE:

    // Nouvelles demandes de projets
    // => WaitingProjectList
    // Liste des clients avec leurs informations
    // => ClientList
    // Les projets validés (avec leur statut etc)
    // => ProjectList (version admin)
    // Nouvelles demandes de contact
    // => ContactRequestList

    // Recuperer la liste des clients et les faires passer aux composants
    const [clients, setClients] = useState([]);
    const [company, setCompany] = useState([]);

    async function getClients() {
        const clients = await getAllUsers();
        setClients(clients);
        console.log("Dans ma page admin :", clients);
    }

    async function getCompany() {
        const companies = await getAllCompany();
        setCompany(companies);
        console.log("Dans ma page admin :", clients);
    }

    useEffect(() => {
        getClients();
        getCompany();
    }, []);

    return (
        <>
            <h1 className="admin-page-title">Mon espace administrateur</h1>

            <Container className="admin-container">
                <Row className="list-item project-list-item">
                    <h2 className="admin-item-title">Les projets en cours</h2>
                    <ProjectList />
                </Row>

                <Row>
                    <Col className="list-item contact-request-list-item">
                        <h2 className="admin-item-title">
                            Les demandes de contact
                        </h2>
                        <ContactRequestList />
                    </Col>

                    <Col className="list-item waiting-project-list-item">
                        <h2 className="admin-item-title">
                            Les demandes de projets
                        </h2>
                        <WaitingProjectList />
                    </Col>
                </Row>

                <Row className="list-item">
                    <h2 className="admin-item-title">Les genres</h2>
                    <GenreList />
                </Row>

                {clients != [] &&
                    clients.map((client) => (
                        <Row className="list-item">
                            <h2 className="admin-item-title">
                                La liste des clients
                            </h2>
                            <FullClientCard
                                key={client.id}
                                client={client}
                                company={company}
                            />
                        </Row>
                    ))}
            </Container>
        </>
    );
}

export default Admin;
