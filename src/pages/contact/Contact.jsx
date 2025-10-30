import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./Contact.scss";
import { create } from "../../api/apiMessageContact";

function Contact() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    function handelSubmit(event) {
        event.preventDefault();
        const formData = {
            mail: email,
            message: message,
        };
        create(formData)
            .then((response) => {
                console.log("message envoyé", response);
                alert("Message envoyé !");
            })
            .catch((error) => {
                console.error("l'envoi du message a échoué", error);
                alert("L'envoi du message a échoué");
            });
    }
    return (
        <div>
            <div className="header-register">
                <h2 className="mb-4 text-center">Contactez-nous</h2>
                <p className="mb-4 text-center">
                    Les champs marqués d'un astérisque (*) sont obligatoires
                </p>
            </div>
            <div>
                <Container className="register-container">
                    <Row className="justify-content-md-center">
                        <Col md={6}>
                            <Form
                                method="post"
                                onSubmit={(event) => handelSubmit(event)}
                            >
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email *</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Votre email"
                                        name="email"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="message"
                                >
                                    <Form.Label>Message *</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Votre message"
                                        name="message"
                                        value={message}
                                        onChange={(event) =>
                                            setMessage(event.target.value)
                                        }
                                        required
                                    />
                                </Form.Group>
                                <div className="form-actions">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="rounded-btn"
                                    >
                                        Envoyer
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Contact;
