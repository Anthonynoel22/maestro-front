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
import { notify } from "../../Toast/Toast.jsx";

function CompanyDataForm({ onUpdate }) {
    // Voir mes informations d'entreprise
    const [companySetting, setCompanySetting] = useState({});

    async function getMyCompanySetting() {
        const myCompany = await getMyCompany();
        setCompanySetting(myCompany.company);
        // console.log("setting log :", myCompany.company);
    }

    useEffect(() => {
        onUpdate ? getMyCompanySetting() : null;
    }, []);

    function companyHandelSubmit(event) {
        // console.log("companyHandelSubmit", companySetting);
        event.preventDefault();

        onUpdate
            ? updateCompany(companySetting) &&
              notify(
                  "Les informations de votre entreprise on bien été misent à jour"
              )
            : createCompany(companySetting) &&
              notify("Entreprise crée avec succès");
    }

    return (
        <>
            <Container className="dataForm-container">
                <Row>
                    {/* <Col sm={6}> */}
                    <Col>
                        {/* ENTREPRISE */}
                        <Row>
                            <Form
                                className="profile-form"
                                method="post"
                                onSubmit={(event) => companyHandelSubmit(event)}
                                aria-labelledby="company-profil-title"
                            >
                                <Container className="profil-item">
                                    {/* EN-TETE */}
                                    <Row className="profil-item-header">
                                        <Col>
                                            <h2
                                                id="company-profil-title"
                                                className="profil-item-header-title company-profil-item-header-title"
                                            >
                                                Mon Entreprise
                                            </h2>
                                        </Col>
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
                                                type="text"
                                                placeholder="Nom de l'entreprise"
                                                defaultValue={
                                                    companySetting?.name
                                                        ? companySetting.name
                                                        : ""
                                                }
                                                onChange={(event) =>
                                                    setCompanySetting(
                                                        (
                                                            prevCompanySetting
                                                        ) => ({
                                                            ...prevCompanySetting, // ← on copie l’ancien objet
                                                            name: event.target
                                                                .value, // ← on remplace seulement name
                                                        })
                                                    )
                                                }
                                            />
                                        </Form.Group>
                                    </Row>

                                    {/* ADRESSE*/}
                                    <Row className="item localisation-item">
                                        <Form.Group
                                            className="profile-form-item"
                                            controlId="companyLocalisation"
                                        >
                                            <Form.Label>Adresse</Form.Label>
                                            <Form.Control
                                                className="profile-form-item-input"
                                                type="text"
                                                placeholder="Adresse de l'entreprise"
                                                defaultValue={
                                                    companySetting?.localisation
                                                        ? companySetting?.localisation
                                                        : ""
                                                }
                                                onChange={(event) =>
                                                    setCompanySetting(
                                                        (
                                                            prevCompanySetting
                                                        ) => ({
                                                            ...prevCompanySetting,
                                                            localisation:
                                                                event.target
                                                                    .value,
                                                        })
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
                                                type="text"
                                                placeholder="Numero de siret"
                                                defaultValue={
                                                    companySetting?.siret
                                                        ? companySetting?.siret
                                                        : ""
                                                }
                                                onChange={(event) =>
                                                    setCompanySetting(
                                                        (
                                                            prevCompanySetting
                                                        ) => ({
                                                            ...prevCompanySetting,
                                                            siret: event.target
                                                                .value,
                                                        })
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
                                            {onUpdate ? "Modifier" : "Créer"}
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
