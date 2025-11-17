import { update, deleteDescription } from "../../api/apiDescription.js";

// Fonction pour mettre à jour une description
export async function handleUpdateDescription(description, title, text, imageFile, onAction) {
    const finalTitle = title || description.title;
    const finalText = text || description.text;

    const formData = new FormData();
    formData.append("title", finalTitle);
    formData.append("text", finalText);
    if (imageFile) formData.append("image", imageFile);

    console.log("id description", description.id);
    try {
        const response = await update(description.id, formData);
        console.log("Description mise à jour :", response);
        if (onAction) onAction();
    } catch (error) {
        return console.error("Erreur :", error);
    }
}

// Fonction pour supprimer une description
export async function handleDeleteDescription(descriptionId, onAction) {
    console.log("id description", descriptionId);
    try {
        const response = await deleteDescription(descriptionId);
        console.log("Description supprimée :", response);
        if (onAction) onAction();
    } catch (error) {
        return console.error("Erreur :", error);
    }
}
