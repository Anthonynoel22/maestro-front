import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { create, update, deleteDescription } from "../../api/apiDescription.js";
import { PlusSquareFill, DashSquareFill } from "react-bootstrap-icons";
import "./DescriptionForm.scss";

//Crée plusieurs états "useState"  pour gérer les valeurs du formulaire, les champs à mettre à jour, et l’affichage du formulaire.
function DescriptionForm({ description, onAction }) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [showForm, setShowForm] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        // Si "title" ou "text" sont vides, utiliser ceux de "description"
        const finalTitle = title || description.title;
        const finalText = text || description.text;

        const formData = new FormData();
        formData.append("title", finalTitle);
        formData.append("text", finalText);
        if (imageFile) formData.append("image", imageFile);

        create(formData)
            .then((response) => {
                console.log("Description créée :", response);
                resetForm();
                if (onAction) onAction();
            })
            .catch((error) => console.error("Erreur :", error));
    }

    function handleUpdate() {
        const finalTitle = title || description.title;
        const finalText = text || description.text;

        const formData = new FormData();
        formData.append("title", finalTitle);
        formData.append("text", finalText);
        if (imageFile) formData.append("image", imageFile);

        console.log("id description", description.id);
        update(description.id, formData)
            .then((response) => {
                console.log("Description mise à jour :", response);
                resetForm();
                if (onAction) onAction();
            })
            .catch((error) => console.error("Erreur :", error));
    }

    //Gère la suppression d’une description.  appelle la fonction deleteDescription, et réinitialise le formulaire.
    function handleDelete() {
        console.log("id description", description.id);
        deleteDescription(description.id)
            .then((response) => {
                console.log("Description supprimée :", response);
                resetForm();
                if (onAction) onAction();
            })
            .catch((error) => console.error("Erreur :", error));
    }

    //Réinitialise tous les états du formulaire
    function resetForm() {
        setTitle("");
        setText("");
        setImageFile(null);
    }

    return (
        <div className="mb-4">
            <div
                className="icon-container"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? (
                    <DashSquareFill size={28} color="#E07A5F" />
                ) : (
                    <PlusSquareFill size={28} color="#E07A5F" />
                )}
            </div>

            <div className="d-flex justify-content-center">
                <div className="border rounded ">
                    {showForm && (
                        <Form
                            onSubmit={handleSubmit}
                            method="post"
                            encType="multipart/form-data"
                            className="mt-4"
                        >
                            <Form.Group controlId="formTitle" className="mt-3">
                                <Form.Label>Titre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    // defaultValue={description.title}
                                    placeholder="Titre de la description"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formText" className="mt-3">
                                <Form.Label>Texte</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={text}
                                    // defaultValue={description.text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formImage" className="mt-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) =>
                                        setImageFile(e.target.files[0])
                                    }
                                />
                            </Form.Group>

                            <div className="mt-4">
                                <Button variant="primary" type="submit">
                                    Créer
                                </Button>
                                <Button
                                    variant="warning"
                                    type="button"
                                    className="ms-2"
                                    onClick={handleUpdate}
                                >
                                    Mettre à jour
                                </Button>
                                <Button
                                    variant="danger"
                                    type="button"
                                    className="ms-2"
                                    onClick={handleDelete}
                                >
                                    Supprimer
                                </Button>
                            </div>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DescriptionForm;
