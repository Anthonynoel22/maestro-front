import ClientInline from "./ClientInline/ClientInline.jsx";
import "./ClientList.scss";
import { getAllUsers } from "../../api/apiUser.js";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ClientList() {
    const [client, setClient] = useState("");

    useEffect(() => {
        const clients = getAllUsers();
        console.log(clients);
    });

    return (
        <Container className="client-list">
            {/* Header-mobile*/}
            <Row className="client-list-header client-list-header-mobile">
                <Col>Liste des clients</Col>
            </Row>
            {/* Header-desktop */}
            <Row className="client-list-header client-list-header-desktop">
                <Col
                    sm={2}
                    className="client-list-header_item client-list-header_name_item"
                >
                    Identité
                </Col>
                <Col
                    sm={3}
                    className="client-list-header_item client-list-header_email_item"
                >
                    Email
                </Col>
                <Col
                    sm={5}
                    className="client-list-header_item client-list-header_adress_item"
                >
                    Adresse
                </Col>
                <Col
                    sm={2}
                    className="client-list-header_item client-list-header_phone-number_item"
                >
                    N° de téléphone
                </Col>
            </Row>
            {/* Lite des clients */}
            <Row className="client-list-result">
                <Col
                    sm={2}
                    className="client-list-result_item client-list-result_name_item"
                >
                    {firstname} {lastname}
                </Col>
                <Col
                    sm={3}
                    className="client-list-result_item client-list-result_email_item"
                >
                    {email}
                </Col>
                <Col
                    sm={5}
                    className="client-list-result_item client-list-result_adress_item"
                >
                    {localisation}
                </Col>
                <Col
                    sm={2}
                    className="client-list-result_item client-list-result_phone-number_item"
                >
                    {phonenumber}
                </Col>
            </Row>
        </Container>
    );
}

export default ClientList;

{
    /* <Row className="client-list-result">
                <Col
                    sm={2}
                    className="client-list-result_item client-list-result_name_item"
                >
                    Lucas Taguet
                </Col>
                <Col
                    sm={3}
                    className="client-list-result_item client-list-result_email_item"
                >
                    lucas.taguet@exemple.com
                </Col>
                <Col
                    sm={5}
                    className="client-list-result_item client-list-result_adress_item"
                >
                    17 Allée du Commit 75099 Paris
                </Col>
                <Col
                    sm={2}
                    className="client-list-result_item client-list-result_phone-number_item"
                >
                    1111111111
                </Col>
            </Row>
            <Row className="client-list-result">
                <Col
                    sm={2}
                    className="client-list-result_item client-list-result_name_item"
                >
                    Yann Middleware
                </Col>
                <Col
                    sm={3}
                    className="client-list-result_item client-list-result_email_item"
                >
                    yann.middleware@exemple.com
                </Col>
                <Col
                    sm={5}
                    className="client-list-result_item client-list-result_adress_item"
                >
                    Appartement 12B, Résidence des Développeurs Éclairés, 2457
                    Boulevard de la Compatibilité Internavigateurs, Quartier des
                    Variables Globales, Commune de Code-sur-Loire, Département
                    du JavaScript-Atlantique, 99999 France
                </Col>
                <Col
                    sm={2}
                    className="client-list-result_item client-list-result_phone-number_item"
                >
                    3333333333
                </Col>
            </Row> */
}
