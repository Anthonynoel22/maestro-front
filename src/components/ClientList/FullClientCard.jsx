import { Container, Row, Col } from "react-bootstrap";
import ClientCard from "./Clientcard/ClientCard.jsx";
import CompanyCard from "./CompanyCard/CompanyCard.jsx";
import "./FullClientCard.scss";

function FullClientCard({ client }) {
    console.log("Dans FullClientCard - client", client);
    return (
        <>
            <Container className="full-client-card-container">
                {client != [] &&
                    client.map((client) => (
                        <Row className="client-card-row">
                            <Col className="client-card-columne">
                                <ClientCard client={client} />
                            </Col>

                            {client.company_id != null && (
                                <Col className="company-card-columne">
                                    <CompanyCard company={client.company} />
                                </Col>
                            )}
                        </Row>
                    ))}
            </Container>
        </>
    );
}

export default FullClientCard;
