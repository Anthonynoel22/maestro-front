import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { addAGenre, getAllGenres } from '../../api/apiGenre.js';
import { useEffect, useState } from 'react';

function GenreForm() {

    const [genreList, setGenreList] = useState([]);
    const [genreToAdd, setGenreToAdd] = useState('');

    async function getListGenres() {
        const allGenreList = await getAllGenres();
        setGenreList(allGenreList);
    }

    async function handleAddGenre() {
        console.log("addgenre clicked"); // ok
        // e.preventDefault();
        // console.log(e.target.value);
        
        const genreAdded = await addAGenre(genreToAdd);
        // console.log(genreAdded);
        
    }

    useEffect(() => {
        getListGenres();
    }, [])

    return (
        <>
            <div className='genre__container'>
                <h1>Formulaire genre</h1>
                <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Liste des genres</Accordion.Header>
                            <Accordion.Body>
                        <ListGroup>
                        {genreList.length > 0 ?
                            genreList.map((genre) => (
                                <ListGroup.Item key={genre.id}>
                                    {genre.label}
                                </ListGroup.Item>
                            ))
                            :
                            <ListGroup.Item>
                                Aucun genre trouvé
                            </ListGroup.Item>
                        }
                        </ListGroup>
                        </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Ajouter un genre</Accordion.Header>
                            <Accordion.Body>
                                <Form onSubmit={(e) => {e.preventDefault(); handleAddGenre(e) } }>
                                    <Form.Label htmlFor='genre'>Ajout d'un genre</Form.Label>
                                    <Form.Control
                                    onChange={(e) => setGenreToAdd(e.target.value)}
                                        value={genreToAdd}
                                        type="text"
                                        id="genre"
                                        name='genre'
                                        aria-describedby="Insert genre to add"
                                    />
                                    <Button type='submit'>Ajouter</Button>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                </Accordion>

            </div>
        </>
    )

}


export default GenreForm;