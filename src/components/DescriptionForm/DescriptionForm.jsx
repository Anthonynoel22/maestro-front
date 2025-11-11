import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { create, update, deleteDescription } from "../../api/apiDescription.js";

function DescriptionForm({ onAction }) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    if (imageFile) formData.append("image", imageFile);

    create(formData)
      .then((response) => {
        console.log("Description créée :", response);
        resetForm();
        if (onAction) onAction(); // actualise la page Home
      })
      .catch((error) => console.error("Erreur :", error));
  }

  function handleUpdate() {
    if (!id) {
      alert("Veuillez renseigner un ID pour mettre à jour une description");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    if (imageFile) formData.append("image", imageFile);

    update(id, formData)
      .then((response) => {
        console.log("Description mise à jour :", response);
        resetForm();
        if (onAction) onAction();
      })
      .catch((error) => console.error("Erreur :", error));
  }

  function handleDelete() {
    if (!id) {
      alert("Veuillez renseigner un ID pour supprimer une description");
      return;
    }

    deleteDescription(id)
      .then((response) => {
        console.log("Description supprimée :", response);
        resetForm();
        if (onAction) onAction();
      })
      .catch((error) => console.error("Erreur :", error));
  }

  function resetForm() {
    setId("");
    setTitle("");
    setText("");
    setImageFile(null);
  }

  return (
    <Form onSubmit={handleSubmit} method="post" encType="multipart/form-data" className="mb-5">
      <Form.Group controlId="formId">
        <Form.Label>ID (pour update / delete)</Form.Label>
        <Form.Control
          type="text"
          value={id}
          placeholder="Entrez l'ID existant"
          onChange={(e) => setId(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formTitle" className="mt-3">
        <Form.Label>Titre</Form.Label>
        <Form.Control
          type="text"
          value={title}
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
          placeholder="Texte de la description"
          onChange={(e) => setText(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formImage" className="mt-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
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
  );
}

export default DescriptionForm;
