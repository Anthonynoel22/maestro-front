import ClientInline from "./ClientInline/ClientInline.jsx";
import "./ClientList.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ClientList() {
    return (
        <Container className="client-liste">
            <Row className="client-liste-header client-liste-header-mobile">
                <Col>Liste des clients</Col>
            </Row>
            <Row className="client-liste-header client-liste-header-desktop">
                <Col
                    sm={2}
                    className="client-liste-header_item client-liste-header_name_item"
                >
                    Identité
                </Col>
                <Col
                    sm={3}
                    className="client-liste-header_item client-liste-header_email_item"
                >
                    Email
                </Col>
                <Col
                    sm={5}
                    className="client-liste-header_item client-liste-header_adress_item"
                >
                    Adresse
                </Col>
                <Col
                    sm={2}
                    className="client-liste-header_item client-liste-header_phone-number_item"
                >
                    N° de téléphone
                </Col>
            </Row>
            <Row className="client-liste-result">
                <Col
                    sm={2}
                    className="client-liste-result_item client-liste-result_name_item"
                >
                    Pierre Dupont
                </Col>
                <Col
                    sm={3}
                    className="client-liste-result_item client-liste-result_email_item"
                >
                    pierre.dupont@exemple.com
                </Col>
                <Col
                    sm={5}
                    className="client-liste-result_item client-liste-result_adress_item"
                >
                    12 Avenue du Dev Fatigué 59001 Debug-sur-Mer
                </Col>
                <Col
                    sm={2}
                    className="client-liste-result_item client-liste-result_phone-number_item"
                >
                    0000000000
                </Col>
            </Row>
            <Row className="client-liste-result">
                <Col
                    sm={2}
                    className="client-liste-result_item client-liste-result_name_item"
                >
                    Lucas Taguet
                </Col>
                <Col
                    sm={3}
                    className="client-liste-result_item client-liste-result_email_item"
                >
                    lucas.taguet@exemple.com
                </Col>
                <Col
                    sm={5}
                    className="client-liste-result_item client-liste-result_adress_item"
                >
                    17 Allée du Commit 75099 Paris
                </Col>
                <Col
                    sm={2}
                    className="client-liste-result_item client-liste-result_phone-number_item"
                >
                    1111111111
                </Col>
            </Row>
            <Row className="client-liste-result">
                <Col
                    sm={2}
                    className="client-liste-result_item client-liste-result_name_item"
                >
                    Yann Middleware
                </Col>
                <Col
                    sm={3}
                    className="client-liste-result_item client-liste-result_email_item"
                >
                    yann.middleware@exemple.com
                </Col>
                <Col
                    sm={5}
                    className="client-liste-result_item client-liste-result_adress_item"
                >
                    Appartement 12B, Résidence des Développeurs Éclairés, 2457
                    Boulevard de la Compatibilité Internavigateurs, Quartier des
                    Variables Globales, Commune de Code-sur-Loire, Département
                    du JavaScript-Atlantique, 99999 France
                </Col>
                <Col
                    sm={2}
                    className="client-liste-result_item client-liste-result_phone-number_item"
                >
                    3333333333
                </Col>
            </Row>
        </Container>
    );
}

export default ClientList;
