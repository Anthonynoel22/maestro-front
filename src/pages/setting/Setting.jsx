import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Setting.scss";

function Setting() {
    return (
        <>
            <Container>
                <Row>
                    {/* PARTICULIER */}
                    <Col sm={6}>
                        <Form className="profile-form">
                            <Container className="profil-item">
                                {/* EN-TETE */}
                                <Row className="profil-item-header">
                                    <Col>Mon Profil</Col>
                                </Row>

                                {/* NOM */}
                                <Row className="item lastname-item">
                                    <Form.Group
                                        className="profile-form-item"
                                        controlId="lastname"
                                    >
                                        <Form.Label>Nom</Form.Label>
                                        <Form.Control
                                            className="profile-form-item-input"
                                            type=""
                                            placeholder="Dupond"
                                            // value={lastname}
                                        />
                                    </Form.Group>
                                </Row>

                                {/* PRENOM */}
                                <Row className="item">
                                    <Form.Group
                                        className="profile-form-item"
                                        controlId="firstname"
                                    >
                                        <Form.Label>Prénom</Form.Label>
                                        <Form.Control
                                            className="profile-form-item-input"
                                            type=""
                                            placeholder="Jean"
                                            // value={firstname}
                                        />
                                    </Form.Group>
                                </Row>

                                {/* EMAIL */}
                                <Row className="item">
                                    <Form.Group
                                        className="profile-form-item"
                                        controlId="email"
                                    >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            className="profile-form-item-input"
                                            type="email"
                                            placeholder="dupond.jean@exemple.com"
                                            // value={email}
                                        />
                                    </Form.Group>
                                </Row>

                                {/* ADRESSE*/}
                                <Row className="item">
                                    <Form.Group
                                        className="profile-form-item"
                                        controlId="localisation"
                                    >
                                        <Form.Label>Adresse</Form.Label>
                                        <Form.Control
                                            className="profile-form-item-input"
                                            type=""
                                            placeholder="10 rue de la rue 92222 Rueville"
                                            // value={localisation}
                                        />
                                    </Form.Group>
                                </Row>

                                {/* NUMERO DE TELEPHONE*/}
                                <Row className="item">
                                    <Form.Group
                                        className="profile-form-item"
                                        controlId="phonenumber"
                                    >
                                        <Form.Label>
                                            Numero de téléphone
                                        </Form.Label>
                                        <Form.Control
                                            className="profile-form-item-input"
                                            type=""
                                            placeholder="0101010101"
                                            // value={phonenumber}
                                        />
                                    </Form.Group>
                                </Row>

                                {/* MOT DE PASSE */}
                                <Row className="item password-item">
                                    <Form.Group
                                        className="profile-form-item"
                                        controlId="password"
                                    >
                                        <Form.Label>Mot de passe</Form.Label>
                                        <Form.Control
                                            className="profile-form-item-input"
                                            type="password"
                                            placeholder="**********"
                                            // value={password}
                                        />
                                    </Form.Group>
                                </Row>
                                {/* BOUTTON */}
                                <Row className="item-button">
                                    <Button className="mofifier-button">
                                        Modifier
                                    </Button>
                                </Row>
                            </Container>
                        </Form>
                    </Col>

                    {/* ENTREPRISE */}
                    <Col sm={6}>
                        <Form className="profile-form">
                            <Container className="profil-item">
                                {/* EN-TETE */}
                                <Row className="profil-item-header">
                                    <Col>Mon Entreprise</Col>
                                </Row>

                                {/* NOM DE L'ENTREPRISE */}
                                <Row className="item name-item">
                                    <Form.Group
                                        className="profile-form-item"
                                        controlId="name"
                                    >
                                        <Form.Label>Nom</Form.Label>
                                        <Form.Control
                                            className="profile-form-item-input"
                                            type=""
                                            placeholder="Dupond Dev"
                                            // value={name}
                                        />
                                    </Form.Group>
                                </Row>

                                {/* ADRESSE*/}
                                <Row className="item">
                                    <Form.Group
                                        className="profile-form-item"
                                        controlId="localisation"
                                    >
                                        <Form.Label>Adresse</Form.Label>
                                        <Form.Control
                                            className="profile-form-item-input"
                                            type=""
                                            placeholder="10 rue de la rue 92222 Rueville"
                                            // value={localisation}
                                        />
                                    </Form.Group>
                                </Row>

                                {/* NUMERO DE SIRET*/}
                                <Row className="item siret-item">
                                    <Form.Group
                                        className="profile-form-item"
                                        controlId="phonenumber"
                                    >
                                        <Form.Label>Numero de siret</Form.Label>
                                        <Form.Control
                                            className="profile-form-item-input"
                                            type=""
                                            placeholder="24586268423368325562561256"
                                            // value={phonenumber}
                                        />
                                    </Form.Group>
                                </Row>

                                {/* BOUTTON */}
                                <Row className="item-button">
                                    <Button className="mofifier-button">
                                        Modifier
                                    </Button>
                                </Row>
                            </Container>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Setting;
