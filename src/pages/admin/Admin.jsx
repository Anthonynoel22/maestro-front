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

                <Row className="list-item">
                    <h2 className="admin-item-title">La liste des clients</h2>
                    {/* <ClientList /> */}
                    {/* <ClientCard /> */}
                    <FullClientCard />
                </Row>
            </Container>
        </>
    );
}

export default Admin;
