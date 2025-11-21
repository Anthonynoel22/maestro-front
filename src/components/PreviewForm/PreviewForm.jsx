import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addPreview } from '../../api/apiPreview.js';
import './PreviewForm.scss'
import { notify } from "../Toast/Toast.jsx";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function PreviewForm({genreList, onSave = () => {}, close = () => {}}) {

    const [form, setForm] = useState();
    const [saving, setSaving] = useState(false);

    function renderTooltip(tooltipMessage) {
        return (
            <Tooltip id="password-tooltip" {...tooltipMessage}>
                {tooltipMessage}
            </Tooltip>
        );
    }

    function initForm() {
        setForm(document.getElementById('addPreview'));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setSaving(true);
        const formCheckbox = event.target;
        const checkedBoxes = formCheckbox.querySelectorAll('.checkBox input[type="checkbox"]:checked');
        // console.log('checkboxes', checkedBoxes);
        // console.log('dans handleSubmit début');
        const starChecked = document.getElementById('star-switch');
        // console.log('starChecked : ', starChecked); // input ok
        
        // console.log(form);
        const formData = new FormData(form);
        const genres = [];
        checkedBoxes.forEach((checkbox) => {
            genres.push(parseInt(checkbox.id));
        });
        formData.append("genres", genres);
        // console.log(genres);
        
        // console.log('formData', formData);
        try {
            await addPreview(formData);
            onSave();
            notify("Extrait ajouté avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'extrait : ", error);
            notify("Erreur lors de l'ajout de l'extrait.");
        } finally {
            setSaving(false);
            close();
        }
        // const previewInfo = await addPreview(formData); // try catch
        // console.log('previewInfo : ', previewInfo);
        
    }

    useEffect(() => {
        initForm();
    }, []);

    return (
        <Form className='addPreview__form' onSubmit={handleSubmit} id='addPreview' method='post' encType="multipart/form-data">
            <h2 className="preview__forms__title">Ajouter un extrait</h2>
            <p className="form__mandatory">Les champs marqués d'un (*) sont obligatoires.</p>
            <div className='form__group__container'>
                <Form.Group className="form__group mb-3">
                    <Form.Label className='form__label' htmlFor='previewTitle'>Titre de l'extrait *</Form.Label>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip('Ce champ est obligatoire.')}
                    >
                        <Form.Control required className='form__input' id='previewTitle' name='title' type="text" placeholder="Entrer le titre" />
                    </OverlayTrigger>
                </Form.Group>
                <Form.Group className="form__group mb-3">
                    <Form.Label className='form__label' htmlFor='previewDate'>Date de l'extrait</Form.Label>
                    <Form.Control className='form__input' id='previewDate' name='date' type="date"/>
                </Form.Group>
                <Form.Group className='form__group mb-3'>
                    <Form.Label className='form__label' htmlFor='star-switch'>Rendre l'extrait accessible sur l'accueil ?</Form.Label>
                    <Form.Check className='form__input'
                        name='isStar'
                        type="switch"
                        id="star-switch"
                        label="Rendre l'extrait star"
                    />
                </Form.Group>
            </div>
            <div className='form__group__container form__group__container--file'>
                <Form.Group className="form__group mb-3">
                    <Form.Label className='form__label' htmlFor='genre'>Ajoute un ou plusieurs genres</Form.Label>
                    {genreList.length > 0 && genreList.map((genre) => (
                        <div key={genre.id}>
                        <Form.Check
                            className='checkBox'
                            inline
                            label={genre.label}
                            name={genre.label}
                            type="checkbox"
                            id={genre.id}
                        />
                        </div>
                    ))}
                </Form.Group>
                <Form.Group className="form__group mb-3">
                    <Form.Label className='form__label' htmlFor='previewFile'>Parcourir les fichiers</Form.Label>
                    <Form.Control id='previewFile' name='previewFile' type="file" />
                </Form.Group>
            </div>
            {/* ajout star ou pas */}
            <div className='form__button__container'><Button className='preview__form__button' type="submit">{saving ? "Ajout..." : "Ajouter"}</Button> </div>
        </Form>
    )

}

export default PreviewForm;