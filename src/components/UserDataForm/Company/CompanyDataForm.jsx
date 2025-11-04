import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../DataForm.scss";
import { useState } from "react";
import { getMyCompany } from "../../../api/apiCompany.js";
import { updateCompany } from "../../../api/apiCompany.js";
import { createCompany } from "../../../api/apiCompany.js";
import { useEffect } from "react";

function CompanyDataForm({ onUpdate }) {
    // Voir mes informations d'entreprise
    const [companySetting, setCompanySetting] = useState({});

    async function getMyCompanySetting() {
        const myCompagny = await getMyCompany();
        setCompanySetting(myCompagny);
        // console.log("setting log :", myCompagny);
    }

    useEffect(() => {
        getMyCompanySetting();
    }, []);

    // Modifier mes informations d'entreprise
    const [newCompanyName, setnewCompanyName] = useState("");
    const [newCompanyLocalisation, setNewCompanyLocalisation] = useState("");
    const [newSiret, setNewSiret] = useState("");
    // const [onUpdate, setOnUpdate] = useState(false);

    function companyHandelSubmit(event) {
        // console.log("companyHandelSubmit");
        event.preventDefault();
        const newCompanyData = {
            name: newCompanyName,
            localisation: newCompanyLocalisation,
            siret: newSiret,
        };
        // setOnUpdate(true);

        onUpdate
            ? updateCompany(newCompanyData)
            : createCompany(newCompanyData);
    }

    return (
        <>
            <Container>
                <Row>
                    <Col sm={6}>
                        {/* ENTREPRISE */}
                        <Row>
                            <Form
                                className="profile-form"
                                method="post"
                                onSubmit={(event) => companyHandelSubmit(event)}
                            >
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
                                                type="name"
                                                placeholder="Nom de l'entreprise"
                                                defaultValue={
                                                    companySetting?.company
                                                        ?.name
                                                        ? companySetting.company
                                                              .name
                                                        : ""
                                                }
                                                onChange={(event) =>
                                                    setnewCompanyName(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </Form.Group>
                                    </Row>

                                    {/* ADRESSE*/}
                                    <Row className="item">
                                        <Form.Group
                                            className="profile-form-item"
                                            controlId="companyLocalisation"
                                        >
                                            <Form.Label>Adresse</Form.Label>
                                            <Form.Control
                                                className="profile-form-item-input"
                                                type=""
                                                placeholder="Adresse de l'entreprise"
                                                defaultValue={
                                                    companySetting?.company
                                                        ?.localisation
                                                        ? companySetting.company
                                                              .localisation
                                                        : ""
                                                }
                                                onChange={(event) =>
                                                    setNewCompanyLocalisation(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </Form.Group>
                                    </Row>

                                    {/* NUMERO DE SIRET*/}
                                    <Row className="item siret-item">
                                        <Form.Group
                                            className="profile-form-item"
                                            controlId="siret"
                                        >
                                            <Form.Label>
                                                Numero de siret
                                            </Form.Label>
                                            <Form.Control
                                                className="profile-form-item-input"
                                                type=""
                                                placeholder="Numero de siret"
                                                defaultValue={
                                                    companySetting?.company
                                                        ?.siret
                                                        ? companySetting.company
                                                              .siret
                                                        : ""
                                                }
                                                onChange={(event) =>
                                                    setNewSiret(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </Form.Group>
                                    </Row>

                                    {/* BOUTTON */}
                                    <Row className="item-button">
                                        <Button
                                            className="mofifier-button"
                                            variant="mofifier-button"
                                            type="submit"
                                        >
                                            Modifier
                                        </Button>
                                    </Row>
                                </Container>
                            </Form>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CompanyDataForm;
