import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { create } from "../../api/apiDescription.js";
import { PlusSquareFill, DashSquareFill } from "react-bootstrap-icons";
import "./DescriptionForm.scss";

function DescriptionForm({ onAction }) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [number, setNumber] = useState(1);
    const [showForm, setShowForm] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("text", text);
        formData.append("number", number); // ajout du champ number
        if (imageFile) formData.append("image", imageFile);

        create(formData)
            .then((response) => {
                console.log("Description créée :", response);
                resetForm();
                if (onAction) onAction();
            })
            .catch((error) => console.error("Erreur :", error));
    }

    function resetForm() {
        setTitle("");
        setText("");
        setImageFile(null);
        setNumber(1);
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
                <div className="border rounded">
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
                                    placeholder="Entrez votre titre"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formText" className="mt-3">
                                <Form.Label>Texte</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={text}
                                    placeholder="Entrez votre texte"
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formNumber" className="mt-3">
                                <Form.Label>Numéro</Form.Label>
                                <Form.Select
                                    value={number}
                                    onChange={(e) =>
                                        setNumber(Number(e.target.value))
                                    }
                                >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                </Form.Select>
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
                            </div>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DescriptionForm;
