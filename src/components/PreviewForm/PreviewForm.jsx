import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addPreview } from '../../api/apiPreview.js';
import './PreviewForm.scss'

function PreviewForm({genreList, onSave = () => {}, close = () => {}}) {

    const [form, setForm] = useState();
    const [saving, setSaving] = useState(false);

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
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'extrait : ", error);
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
        <Form onSubmit={handleSubmit} id='addPreview' method='post' encType="multipart/form-data">
            <h2 className="form__title">Ajouter un extrait</h2>
            <div className='form__group__container'>
                <Form.Group className="form__group mb-3">
                    <Form.Label className='form__label' htmlFor='previewTitle'>Titre de l'extrait</Form.Label>
                    <Form.Control className='form__input' id='previewTitle' name='title' type="text" placeholder="Entrer le titre" />
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