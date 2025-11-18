import { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext.jsx";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { updatePreview, deletePreview } from "../../api/apiPreview.js";
import Modal from 'react-bootstrap/Modal';


function UpdatePreviewForm({ id, genreList = [], preview, onSaved = () => {} }) {

    // un seul state pour tout le formulaire (genres stocke les ids)
    const [formData, setFormData] = useState(() => ({
        title: preview?.title || "",
        isStar: preview?.isStar ?? false,
        date: preview?.date ? new Date(preview.date).toISOString().slice(0,10) : "",
        // on transduit listGenres (objets) en tableau d'ids 
        // afin de faciliter la gestion des checkbox
        genres: preview?.listGenres ? preview.listGenres.map(g => g.id) : []
    }));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    // Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {userIs} = useContext(UserContext)
    
    // il faut recevoir les infos de la preview

    function toggleGenre(genreId) {
        setFormData(prev => {
            // on regarde si genreId est déjà dans la liste
            const has = prev.genres.includes(genreId);
            // on ajoute ou enlève selon le cas
            // on reprend l'ancien tableau pour ne pas perdre les autres genres
            // et en fonction de la présence on filtre ou on ajoute
            return { ...prev, genres: has ? prev.genres.filter(id => id !== genreId) : [...prev.genres, genreId] };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError(null);

        const payload = {
            title: formData.title,
            date: formData.date || null,
            isStar: formData.isStar,
            // envoi au backend sous forme  "1,2"
            genres: formData.genres.length ? formData.genres.join(',') : ""
        };

        try {
            await updatePreview(id, payload); 
            onSaved();
        } catch (err) {
            console.error("Erreur mise à jour preview:", err);
            setError("Échec de la mise à jour.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(e) {
        e.preventDefault();
        setSaving(true);
        setError(null);
        // alert "êtes vous sur de vouloir supprimer l'extrait ?"
        try {
            await deletePreview(id);
            onSaved();
        } catch (err) {
            console.error("Erreur lors de la suppression de l'extrait : ", err);
            setError("Échec de la suppression.");
        } finally {
            setSaving(false);
        }

    }

    // synchronise formData si la prop preview change
    useEffect(() => {
        if (!preview) return;
        setFormData({
            title: preview.title || "",
            isStar: preview.isStar ?? false,
            date: preview.date ? new Date(preview.date).toISOString().slice(0,10) : "",
            genres: preview.listGenres ? preview.listGenres.map(g => g.id) : []
        });
    }, [preview]);

    if (!preview) return null;

    return (

        <>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit} id='updatePreview' method='patch'>
                <h2 className="form__title">Modifier l'extrait</h2>
                <Form.Group className="mb-3 form__group">
                    <Form.Label className='form__label' htmlFor='previewTitle'>Titre de l'extrait</Form.Label>
                    <Form.Control className='form__input' value={formData.title} onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))} id='previewTitle' name='title' type="text" placeholder="Entrer le titre" />
                </Form.Group>
                <Form.Group className="mb-3 form__group">
                    <Form.Label className='form__label' htmlFor='previewDate'>Date de l'extrait</Form.Label>
                    <Form.Control className='form__input' value={formData.date} onChange={(e) => setFormData(prev => ({...prev, date: e.target.value}))} id='previewDate' name='date' type="date"/>
                </Form.Group>
                <Form.Group className="form__group">
                    <Form.Label className='form__label' htmlFor='star-switch'>Voulez-vous rendre cet extrait accessible sur la page d'accueil ?</Form.Label>
                    <Form.Check className='form__input'
                        checked={formData.isStar}
                        onChange={(e) => setFormData(prev => ({...prev, isStar: e.target.checked}))}
                        name='isStar'
                        type="switch"
                        id="star-switch"
                        label="Rendre l'extrait star"
                    />
                </Form.Group>
                <Form.Group className="mb-3 form__group">
                    <Form.Label className='form__label' htmlFor='genre'>Ajoute un ou plusieurs genres</Form.Label>
                    {genreList.length > 0 && genreList.map((genre) => (
                        <Form.Check key={genre.id}
                            className='checkBox form__input'
                            inline
                            label={genre.label}
                            name={genre.label}
                            type="checkbox"
                            id={`genre-${genre.id}`}
                            checked={formData.genres.includes(genre.id)}
                            onChange={() => toggleGenre(genre.id)}
                        />
                    ))}
                </Form.Group>
                <div className="d-flex form__button__container">
                    <Button className="preview__form__button" type="submit" disabled={saving}>
                        {saving ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                </div>
                <div className="d-flex form__button__container">
                    <Button onClick={(e) => { e.preventDefault(); handleShow()}} disabled={saving} className="preview__form__button preview__form__button--delete">
                    {saving ? "Suppression..." : "Supprimer l'extrait"}
                    </Button>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Supprimer l'extrait</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Etes-vous sûr de vouloir supprimer l'extrait "{preview.title}" ?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={(e) => {e.preventDefault(); handleDelete(e); handleClose()}}>
                        Supprimer l'extrait
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </>
    
    )


}

export default UpdatePreviewForm;