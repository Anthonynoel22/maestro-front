import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import {Trash} from "react-bootstrap-icons";
import './GenreForm.scss'
import { addAGenre, getAllGenres, deleteGenre } from '../../api/apiGenre.js';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function GenreForm() {

    const [genreList, setGenreList] = useState([]);
    const [genreToAdd, setGenreToAdd] = useState('');
    const [saving, setSaving] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

        // Modal
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

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
            console.error("Erreur lors de l'ajout du genre' : ", error);
        } finally {
            setSaving(false);
        }
        
    }


    async function handleDelete(id) {
        handleOnSaved();
        console.log('id to delete : ', id);
        setSaving(true);
        try {
            console.log(id);
            // setIdToDelete(id);
            await deleteGenre(id);
            handleOnSaved();
        } catch (error) {
            console.error("Erreur lors de la suppression du genre : ", error);
        } finally {
            setSaving(false);
        }
    }

    useEffect(() => {
        getListGenres();
    }, [])

    return (
        <>
            <section className='genre__container'>
                <h2 className='genre__title'>Les Genres</h2>
                <Accordion>
                    <Accordion.Item className='genre__accordion__item' eventKey="1">
                        <Accordion.Header className='genre__accordion__title'>Liste des genres</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    
                                    {genreList.length > 0 ?
                                        genreList.map((genre) => (
                                            <>
                                            <Form className='genre__form__item' key={genre.id}>
                                                <ListGroup.Item >
                                                    <Form.Group className='genre__list__item genre__list__item--trash' >
                                                        <Form.Label htmlFor='genre' id={genre.label} className='genre__label' >{genre.label}</Form.Label>
                                                        <Button id={genre.id} name='genre' onClick={(e) => {e.preventDefault(); setIdToDelete(genre.id); handleShow()}} className='trash__icon'>
                                                                <Trash />
                                                        </Button>
                                                    </Form.Group>
                                                </ListGroup.Item>
                                            </Form>

                                            </>
                                        ))
                                        :
                                        <ListGroup.Item className='genre__list__item'>
                                            Aucun genre trouvé
                                        </ListGroup.Item>
                                    }
                                    
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Supprimer le genre</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Etes-vous sûr de vouloir supprimer le genre ?</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Annuler
                            </Button>
                            <Button variant="primary" onClick={(e) => {e.preventDefault(); handleDelete(idToDelete); handleClose()}}>
                                Supprimer le genre
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        <Accordion.Item className='genre__accordion__item' eventKey="0">
                            <Accordion.Header className='genre__accordion__title'>Ajouter un genre</Accordion.Header>
                            <Accordion.Body>
                                <Form className='genre__form' onSubmit={(e) => {e.preventDefault(); handleAddGenre(e)} }>
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
                                        <Button id='button__red' className='genre__form__button' type='submit'>
                                        {saving ? "Ajout..." : "Ajouter"}
                                        </Button>
                                    </div>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                </Accordion>

            </section>
        </>
    )

}


export default GenreForm;