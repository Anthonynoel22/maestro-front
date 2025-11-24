import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { PencilSquare, DashSquareFill } from "react-bootstrap-icons";
import {handleUpdateDescription,handleDeleteDescription,} from "../../DescriptionAction/DescriptionAction.jsx";
import UserContext from "../../../UserContext.jsx";

function DescriptionItem({ description, onAction }) {
    const [title, setTitle] = useState(description.title || "");
    const [text, setText] = useState(description.text || "");
    const [imageFile, setImageFile] = useState(null);
    const [showActions, setShowActions] = useState(false);

    // On récupère le rôle utilisateur depuis le contexte
    const { userIs } = useContext(UserContext);

    // Construction de l’URL de l’image à partir de image_link
    const URL_IMAGES = import.meta.env.VITE_IMAGES_URL;
    const imageSrc = description.image_link
        ? `${URL_IMAGES}${description.image_link.split("/").pop()}`
        : null;

    function handleUpdate() {
        handleUpdateDescription(description, title, text, imageFile, onAction);
    }

    function handleDelete() {
        handleDeleteDescription(description.id, onAction);
    }
    return (
        <>
            <div className="d-flex justify-content-between align-items-start">
                <div className="description__container">
                    <h1 className="description__title">{description.title}</h1>
                    <img
                        className="description__image"
                        src={imageSrc}
                        alt="présentation du composateur"
                    />

                    <p className="description__text">{description.text}</p>
                </div>

                {/* Le bouton crayon n’apparaît que pour les administrateurs */}
                {userIs === "admin" && (
                    <div
                        className="icon-container"
                        aria-label={showActions ? "Masquer les actions de modification" : "Afficher les actions de modification"}
                        tabIndex={0}
                        onClick={() => setShowActions(!showActions)}
                        style={{ cursor: "pointer" }}
                    >
                        {showActions ? (
                            <DashSquareFill size={24} color="#E07A5F" />
                        ) : (
                            <PencilSquare size={24} color="#3D405B" />
                        )}
                    </div>
                )}
            </div>

            {/* Le formulaire d’action n’est affiché que pour l’admin */}
            {userIs === "admin" && showActions && (
                <Form
                    className="mt-3 border-top pt-3 updatePreview"
                    id="updatePreview"
                >
                    <h2 className="form__title">Modifier la description</h2>
                    <Form.Group className="mb-3 form__group">
                        <Form.Label className="form__label" htmlFor="newTitle">
                            Nouveau titre
                        </Form.Label>
                        <Form.Control
                            className="form__input"
                            id="newTitle"
                            type="text"
                            value={title}
                            aria-label="Ajouter un nouveaux titre"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 form__group">
                        <Form.Label className="form__label" htmlFor="newText">
                            Nouveau texte
                        </Form.Label>
                        <Form.Control
                            className="form__input"
                            as="textarea"
                            rows={2}
                            id="newText"
                            value={text}
                            aria-label="Ajouter un nouveaux texte"
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 form__group">
                        <Form.Label className="form__label" htmlFor="newImage">
                            Nouvelle image
                        </Form.Label>
                        <Form.Control
                            className="form__input"
                            id="newImage"
                            type="file"
                            aria-label="Ajouter une nouvelle image"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                    </Form.Group>

                    <div className="d-flex form__button__container">
                        <Button
                            variant="warning"
                            className="preview__form__button me-2"
                            onClick={handleUpdate}
                            aria-label="Mettre à jour la description"
                        >
                            Mettre à jour
                        </Button>
                        <Button
                            variant="danger"
                            className="preview__form__button preview__form__button--delete"
                            onClick={handleDelete}
                            aria-label="Supprimer la description"
                        >
                            Supprimer
                        </Button>
                    </div>
                </Form>
            )}
        </>
    );
}
export default DescriptionItem;
