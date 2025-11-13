import "./ProjectForm.scss";
import { createProject } from "../../api/apiProject.js";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ProjectForm() {
    // useState permet de stocker et mettre à jour les valeurs du formulaire.
    const [name, setName] = useState("");
    const [resume, setResume] = useState("");

    // ****A METTRE DANS UNE FUNCTION ASYNC AWAIT******
    // Fonction appelée quand l'utilisateur valide le formulaire
    const handleCreateProject = (e) => {
        e.preventDefault(); // empêche la page de se recharger

        // crée un objet avec les données saisies par l'utilisateur 
        const projectData = { name: name, resume: resume };
        // envoie les données
        createProject(projectData);
    };

    return (
        <Form className="project-frm" onSubmit={(e) => handleCreateProject(e)}> 
        {/* onSubmit = exécute la fonction "handleCreateProject" quand le formulaire est soumis */}
            <h2 className="title">Nouvelle demande de projet</h2>

            {/* Titre du projet */}
            <Form.Group controlId="FormTitleProject">
                <Form.Label className="form__title" >
                    Titre du projet*
                </Form.Label>
                <Form.Control
                    className="form__titleInput"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // onChange = met à jour la valeur de l’état "name" à chaque saisie dans le champ de formulaire.
                />
            </Form.Group>

            {/* Description */}
            <Form.Group
                className="form__Description"
                controlId="FormDescription"
            >
                <Form.Label>Description du projet*</Form.Label>
                <Form.Control
                    className="form__descriptionInput"
                    as="textarea"
                    rows={4}
                    value={resume}
                    onChange={(e) => setResume(e.target.value)} // onChange = met à jour la valeur de l’état "resume" à chaque saisie dans le champ de formulaire.
                />
            </Form.Group>

            {/* bouton*/}
            <Button className="form__button" variant="primary" type="submit">
                Envoyer ma demande
            </Button>
            <p className="form__champsObligatoire">*champs obligatoires</p>
        </Form>
    );
}

export default ProjectForm;
