import { Container, Row, Col } from "react-bootstrap";
import ClientCard from "./Clientcard/ClientCard.jsx";
import CompanyCard from "./CompanyCard/CompanyCard.jsx";
import "./FullClientCard.scss";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useEffect } from "react";
import { getAllUsers, getSortedUsers } from "../../api/apiUser.js";

function FullClientCard() {
    // Recuperer la liste des clients et les faires passer aux composants
    const [clients, setClients] = useState([]);
    const [sortedClients, setSortedClients] = useState("");

    async function getClients() {
        const clients = await getAllUsers();
        setClients(clients);
        console.log("Dans ma page admin :", clients);
    }

    async function getSortedClients(sortedUsers) {
        const clients = await getSortedUsers(sortedUsers);
        setClients(clients);
        console.log("Dans ma page admin :", clients);
    }

    function handelChange(event) {
        event.preventDefault();
        const sortedUsers = event.target.value;
        console.log("sortedUsers : ", sortedUsers);
        setSortedClients(sortedUsers);

        if (sortedClients === "") {
            getClients();
        } else {
            getSortedClients(sortedClients);
        }
    }

    useEffect(() => {
        getClients();
    }, []);

    return (
        <>
            <div className="client-sort-form-select">
                <Form.Select
                    aria-label="client-sort-form-select"
                    onChange={handelChange}
                >
                    <option>Trier par</option>
                    <option value="lastnameSelected">Nom</option>
                    <option value="firstnameSelected">Prénom</option>
                </Form.Select>
            </div>

            <div className="cards-div">
                <Container className="full-client-card-container">
                    {clients != [] &&
                        clients.map((client) => (
                            <Row key={client.id} className="client-card-row">
                                <Col
                                    sm
                                    className="card-column client-card-column"
                                >
                                    <ClientCard client={client} />
                                </Col>

                                {client.company_id != null && (
                                    <Col
                                        sm
                                        className="card-column company-card-column"
                                    >
                                        <CompanyCard company={client.company} />
                                    </Col>
                                )}
                            </Row>
                        ))}
                </Container>
            </div>
        </>
    );
}

export default FullClientCard;
