import Preview from "../Preview/Preview.jsx";
import "./PreviewList.scss"
import { getAllPreviews, getAllGenres, filterByGenre } from "../../api/apiPreview.js";
import { useState, useEffect } from "react";
// import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

function PreviewList() {

    const [selectedGenre, setSelectedGenre] = useState('rock');
    const [previewList, setPreviewList] = useState([]);
    const [genreList, setGenreList] = useState([]);

    async function getPreviewList() {
        const allPreviewList = await getAllPreviews();
        setPreviewList(allPreviewList);
    }

    async function getGenreList() {
        const allGenreList = await getAllGenres();
        setGenreList(allGenreList);
    }

    async function getPreviewByGenreFilter(genre) {
        const genreFiltered = await filterByGenre(genre);
        setPreviewList(genreFiltered);
    }

    function handleChange(e) {
        e.preventDefault();
        const genre = e.target.value;
        console.log('genre : ',genre);
        setSelectedGenre(genre);
        console.log('selectedGenre : ', selectedGenre);

        if (genre == "") {
            getPreviewList();
        } else {
            getPreviewByGenreFilter(genre);
        }
    }


    useEffect(() => {
        getPreviewList();
        getGenreList();
    }, [])

    // test genres en dur pour map ensuite
    // const genres = ["pop", "rock", "classique"]
    const audioscr = "/src/assets/RAYE.mp3"

    return (
        <>
                <div className="preview__list__title__container">
                    <h1 className="preview__list__title">Tous les extraits</h1>
                    {/* on a notre formulaire pour sélectionner un genre */}
                    <Form.Select  onChange={handleChange} className="toggle-button" aria-label="Default select example">
                        <option value=''>Trier par genre</option>
                        {/* On map sur la liste des genres */}
                        {genreList.length != 0 && genreList.map((genre) => (
                            // On affiche le genre (genreList[index])
                            <option value={genre.label} key={genre.id} className="genre__item">{genre.label}</option>
                        ))}
                        {/* <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option> */}
                    </Form.Select>
                    {/* <Dropdown>
                        <Dropdown.Toggle className="toggle-button" variant="success" id="dropdown-basic">
                            <i className="sort-icon bi bi-sort-down fs-1"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="genre__menu">
                        {genreList.map((genre) => (
                            <Dropdown.Item key={genre.id} className="genre__item" href="#">{genre.label}</Dropdown.Item>
                        ))}
                        </Dropdown.Menu>
                    </Dropdown> */}
                </div>

                <section className="preview__list">
                    {/* Ici, on map sur la liste des extraits */}
                    {previewList.length != 0 ? previewList.map((preview) => (
                        // On affiche l'extrait suivant l'index
                        <Preview key={preview.id} audiosrc={audioscr} title={preview.title} genres={preview.listGenres}/>
                    ))
                    : <p>Pas d'extraits</p>
                    }
                    {/* Pour le moment en dur pour les tests */}
                    {/* <Preview audiosrc={audioscr} title="titre 1" genres={genres}/>
                    <Preview audiosrc={audioscr} title="titre 2" genres={genres}/>
                    <Preview audiosrc={audioscr} title="titre 3" genres={genres}/> */}
                </section>
        </>
    )

}

export default PreviewList;