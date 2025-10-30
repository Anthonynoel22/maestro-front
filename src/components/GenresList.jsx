import React, { useEffect, useState } from "react";
import { getAllGenres, addAGenre, updateGenre, deleteGenre } from "../api/apiGenre.js"; 


    /*useState
    genres est tableau vide contenant tous les genres.
    newGenre est une chaîne vide "" qui va stocker le texte du champ pour ajouter un genre.
    editingId  identifiant du genre actuellement en cours d’édition qui est initialisé à null
    editingLabel utilise une chaine vide "" destinée à l'édition d'un genre.*/

function GenreList() {
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingLabel, setEditingLabel] = useState("");

    {/* hook useEffect s'exucute une seule fois il appelle gelAllGenres() pour 
    récupérer les genres puis setGenres utilise data s’il est undefined ou null, sinon on utilise un tableau vide*/}
    useEffect(() => {
        getAllGenres().then((data) => {
            setGenres(data || []);
        });
    }, []);

    /* ajouter un nouveaux genre à la soumission du formulaire 
    preventDefault enpeche le comportement par défaut du formulair
    .trim vérifie que l'utilisateur n'a pas soumis de champs vide
    await newGenre ajoute a l'api addaGenre 
    setNewGenre réinialise le champs de texte après soumission du formulaire*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newGenre.trim()) return;
        await addAGenre(newGenre);
        getAllGenres().then((data) => setGenres(data || []));
        setNewGenre("");
    };

    /*modifier un genre
    Quand l’utilisateur clique sur “Modifier”, on enregistre 
    l’id du genre à modifier (editingId),
    son nom actuel dans le champ de texte (editingLabel).*/

    const handleEditClick = (genre) => {
        setEditingId(genre.id);
        setEditingLabel(genre.label);
    };

    /* sauvegarder un genre modifier
    Empêche le rechargement du formulaire.
    Vérifie que le champ n’est pas vide.
    Met à jour le genre via updateGenre(id, label).
    Recharge la liste mise à jour.
    Réinitialise les états d’édition.*/
    const handleSaveEdit = async (e) => {
        e.preventDefault();
        if (!editingLabel.trim()) return;
        await updateGenre(editingId, editingLabel);
        getAllGenres().then((data) => setGenres(data || []));
        setEditingId(null);
        setEditingLabel("");
    };

    /*annuler la modification 
    restaure l’état initial lorsqu’un utilisateur 
    décide de ne pas enregistrer les changements d’un genre.*/

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingLabel("");
    }; 

    // supprimer un genre à partir de son id recharge la listes des genres après suppression
    const handleDelete = async (id) => {
        await deleteGenre(id);
        getAllGenres().then((data) => setGenres(data || []));
    };


    /*Boucle sur chaque élément de genres avec map().
    Si editingId correspond à l’id du genre actuel 
    Affiche un formulaire d’édition (input + boutons “Enregistrer” et “Annuler”).
    Sinon 
    Affiche le nom du genre avec les boutons “Modifier” et “Supprimer”.
    En dehors de la liste :
    Affiche le formulaire d’ajout d’un nouveau genre.*/

    return (
        <div>
            <ul>
                {genres.map((genre) =>
                    editingId === genre.id ? (
                        <li key={genre.id}>
                            <form onSubmit={handleSaveEdit} >
                                <input
                                    type="text"
                                    value={editingLabel}
                                    onChange={(e) => setEditingLabel(e.target.value)}
                                />
                                <button type="submit">Enregistrer</button>
                                <button onClick={handleCancelEdit} type="button">Annuler</button>
                            </form>
                        </li>
                    ) : (
                        <li key={genre.id}>
                            {genre.label}
                            <button onClick={() => handleEditClick(genre)}>Modifier</button>
                            <button onClick={() => handleDelete(genre.id)}>Supprimer</button>
                        </li>
                    )
                )}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    placeholder="Ajouter un genre"
                />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}

export default GenreList;
