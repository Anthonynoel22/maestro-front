import { Container, Row, Col } from "react-bootstrap";
import ClientCard from "./Clientcard/ClientCard.jsx";
import CompanyCard from "./CompanyCard/CompanyCard.jsx";
import "./FullClientCard.scss";

function FullClientCard({ client, company }) {
    console.log("Dans FullClientCard - client", client);
    console.log("Dans FullClientCard - company", company);
    return (
        <>
            <Container className="full-client-card-container">
                <Row>
                    <Col>
                        <ClientCard client={client} />
                    </Col>
                    <Col>
                        <CompanyCard company={company} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default FullClientCard;
