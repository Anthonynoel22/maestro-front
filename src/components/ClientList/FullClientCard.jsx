import { Container, Row, Col, Button } from "react-bootstrap";
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

    async function getClients() {
        const clients = await getAllUsers();
        setClients(clients);
        // console.log("Dans ma page admin :", clients);
    }

    // ici ton param a le nom d'un  state attention
    async function getSortedClients(sortedUsers) {
        const clients = await getSortedUsers(sortedUsers);
        setClients(clients);
        // console.log("Dans ma page admin :", clients);
    }

    function handleChange(event) {
        // ne pas mettre event.preventDefault() dans un onChange de select !!!

        if (event.target.value === "") {
            getClients();
        } else {
            getSortedClients(event.target.value);
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
                    onChange={handleChange}
                >
                    <option value="">Trier la liste des clients</option>
                    <option value="lastnameSelected">Par nom</option>
                    <option value="firstnameSelected">Par prénom</option>
                </Form.Select>
            </div>

            <div className="cards-div">
                <Container className="full-client-card-container">
                    {clients != [] &&
                        clients.map((client) => (
                            <Row key={client.id} className="client-card-row ">
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
