import { Container, Row, Col } from "react-bootstrap";
import ClientCard from "./Clientcard/ClientCard";
import CompanyCard from "./CompanyCard/CompanyCard";
import "./FullClientCard.scss";

function FullClientCard() {
    return (
        <>
            <Container className="full-client-card-container">
                <Row>
                    <Col>
                        <ClientCard />
                    </Col>
                    <Col>
                        <CompanyCard />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default FullClientCard;
