import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addPreview } from '../../api/apiPreview.js';

function PreviewForm({genreList}) {

    const [form, setForm] = useState();

    function initForm() {
        setForm(document.getElementById('addPreview'));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formCheckbox = event.target;
        const checkedBoxes = formCheckbox.querySelectorAll('input[type="checkbox"]:checked');
        console.log('checkboxes', checkedBoxes);
        console.log('dans handleSubmit début');
        // if (document.getElementById('addPreview') != null) {
        //     setForm(document.getElementById('addPreview'));
        // }
        console.log(form);
        const formData = new FormData(form);
        const genres = [];
        checkedBoxes.forEach((checkbox) => {
            genres.push(parseInt(checkbox.id));
        });
        formData.append("genres", genres);
        console.log(genres);
        
        console.log('formData', formData);
        const previewInfo = await addPreview(formData);
        console.log('previewInfo : ', previewInfo);
        
    }

    useEffect(() => {
        initForm();
    }, []);

    return (
        <Form onSubmit={handleSubmit} id='addPreview' method='post' encType="multipart/form-data">
            <Form.Group className="mb-3">
                <Form.Label htmlFor='previewTitle'>Titre de l'extrait</Form.Label>
                <Form.Control id='previewTitle' name='title' type="text" placeholder="Entrer le titre" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='genre'>Ajoute un ou plusieurs genres</Form.Label>
                {genreList.length > 0 && genreList.map((genre) => (
                    <div key={genre.id}>
                    <Form.Check
                        inline
                        label={genre.label}
                        name={genre.label}
                        type="checkbox"
                        id={genre.id}
                    />
                    </div>
                ))}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='previewFile'>Parcourir les fichiers</Form.Label>
                <Form.Control id='previewFile' name='previewFile' type="file" />
            </Form.Group>
            {/* ajout star ou pas */}
            <Button type="submit">Submit</Button> 
        </Form>
    )

}

export default PreviewForm;