import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import './GenreForm.scss'
import { addAGenre, getAllGenres } from '../../api/apiGenre.js';
import { useEffect, useState } from 'react';

function GenreForm() {

    const [genreList, setGenreList] = useState([]);
    const [genreToAdd, setGenreToAdd] = useState('');
    const [saving, setSaving] = useState(false);

    async function getListGenres() {
        const allGenreList = await getAllGenres();
        setGenreList(allGenreList);
    }

    function handleOnSaved() {
        getListGenres();
    }

    async function handleAddGenre() {
        console.log("addgenre clicked"); // ok
        setSaving(true);
        // e.preventDefault();
        // console.log(e.target.value);
        try {
            const genreAdded = await addAGenre(genreToAdd);
            handleOnSaved();
        } catch (error) {
            console.error("Erreur lors de la suppression de l'extrait : ", error);
        } finally {
            setSaving(false);
        }
        
    }

    useEffect(() => {
        getListGenres();
    }, [])

    return (
        <>
            <div className='genre__container'>
                <h1>Genre</h1>
                <Accordion>
                    <Accordion.Item className='genre__accordion__item' eventKey="1">
                        <Accordion.Header className='genre__accordion__title'>Liste des genres</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    {genreList.length > 0 ?
                                        genreList.map((genre) => (
                                            <ListGroup.Item className='genre__list__item' key={genre.id}>
                                                {genre.label}
                                            </ListGroup.Item>
                                        ))
                                        :
                                        <ListGroup.Item className='genre__list__item'>
                                            Aucun genre trouvé
                                        </ListGroup.Item>
                                    }
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item className='genre__accordion__item' eventKey="0">
                            <Accordion.Header className='genre__accordion__title'>Ajouter un genre</Accordion.Header>
                            <Accordion.Body>
                                <Form className='genre__form' onSubmit={(e) => {e.preventDefault(); handleAddGenre(e) } }>
                                    <Form.Label htmlFor='genre'>Ajout d'un genre</Form.Label>
                                    <Form.Control
                                    onChange={(e) => setGenreToAdd(e.target.value)}
                                        value={genreToAdd}
                                        type="text"
                                        id="genre"
                                        name='genre'
                                        aria-describedby="Insert genre to add"
                                    />
                                    <div className='genre__button__container'>
                                        <Button className='genre__form__button' type='submit'>
                                        {saving ? "Ajout..." : "Ajouter"}
                                        </Button>
                                    </div>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                </Accordion>

            </div>
        </>
    )

}


export default GenreForm;