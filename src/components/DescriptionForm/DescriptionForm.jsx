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
        formData.append("number", number);
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
        <div className="description__form__wrapper">
            <div
                className="description__icon__container"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? (
                    <DashSquareFill size={28} color="#E07A5F" />
                ) : (
                    <PlusSquareFill size={28} color="#E07A5F" />
                )}
            </div>

            {showForm && (
                <Form
                    onSubmit={handleSubmit}
                    method="post"
                    encType="multipart/form-data"
                    id="addDescription"
                    className="description__form"
                >
                    <h2 className="form__title">Ajouter une description</h2>

                    <div className="form__group__container">
                        <Form.Group className="form__group mb-3">
                            <Form.Label className="form__label">Titre</Form.Label>
                            <Form.Control
                                className="form__input"
                                type="text"
                                value={title}
                                placeholder="Entrez le titre"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="form__group mb-3">
                            <Form.Label className="form__label">Texte</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                className="form__input"
                                value={text}
                                placeholder="Entrez le texte"
                                onChange={(e) => setText(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="form__group mb-3">
                            <Form.Label className="form__label">Numéro</Form.Label>
                            <Form.Select
                                className="form__input"
                                value={number}
                                onChange={(e) => setNumber(Number(e.target.value))}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="form__group mb-3">
                            <Form.Label className="form__label">Image</Form.Label>
                            <Form.Control
                                className="form__input"
                                type="file"
                                onChange={(e) => setImageFile(e.target.files[0])}
                            />
                        </Form.Group>
                    </div>

                    <div className="form__button__container">
                        <Button className="description__form__button" type="submit">
                            Créer
                        </Button>
                    </div>
                </Form>
            )}
        </div>
    );
}

export default DescriptionForm;
