import ContactRequestList from "../../components/ContactRequestList/ContactRequestList.jsx";
import GenreForm from "../../components/GenreForm/GenreForm.jsx";
// import ClientList from "../../components/ClientList/ClientList.jsx"
import ProjectList from "../../components/ProjectList/ProjectList.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Admin.scss";
import WaitingProjectList from "../../components/WaitingProjectList/WaitingProjectList.jsx";
import FullClientCard from "../../components/ClientList/FullClientCard.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { getAllUsers } from "../../api/apiUser.js";

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

    async function getClients() {
        const clients = await getAllUsers();
        setClients(clients);
        console.log("Dans ma page admin :", clients);
    }

        // LES COMPOSANTS QUI SERONT SUR LA PAGE:
        
        // Nouvelles demandes de projets 
        // => WaitingProjectList
        // Liste des clients avec leurs informations 
        // => ClientList
        // Les projets validés (avec leur statut etc) 
        // => ProjectList (version admin)
        // Nouvelles demandes de contact 
        // => ContactRequestList
        // Formulaire pour CRUD genre
        // => GenreForm

  
    useEffect(() => {
        getClients();
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

                <Row>
                    <Col className="list-item genre-list-item">
                        <h2 className="admin-item-title">Les genres</h2>
                        <GenreForm />
                    </Col>
                    <Col className="list-item full-card-list-item">
                        <h2 className="admin-item-title">
                            La liste des clients
                        </h2>
                        <FullClientCard key={clients.id} client={clients} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Admin;
