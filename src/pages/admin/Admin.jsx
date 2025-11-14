import ContactRequestList from "../../components/ContactRequestList/ContactRequestList.jsx";
import GenreForm from "../../components/GenreForm/GenreForm.jsx";
// import ClientList from "../../components/ClientList/ClientList.jsx"
import ProjectList from "../../components/ProjectList/ProjectList.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Admin.scss";
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
                {/*A PROPOSER EN VERSION 2 */}
                {/* <Row className="list-item project-list-item">
                    <h2 className="admin-item-title">Les projets en cours</h2>
                </Row> */}

                <Row>
                    <Col sm className="list-item contact-request-list-item">
                        <h2 className="admin-item-title">
                            Les demandes de contact
                        </h2>
                        <ContactRequestList />
                    </Col>

                    <Col sm className="list-item waiting-project-list-item">
                        <h2 className="admin-item-title">
                            Les projets
                        </h2>
                        <ProjectList />
                    </Col>
                </Row>

                <Row className="row-3">
                    <Col sm={5} className="list-item genre-list-item">
                        <h2 className="admin-item-title">Les genres</h2>
                        <GenreForm />
                    </Col>
                    <Col className="list-item full-card-list-item">
                        <h2 className="admin-item-title">
                            La liste des clients
                        </h2>
                        <FullClientCard />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Admin;
