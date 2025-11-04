import Preview from "../Preview/Preview.jsx";
import "./PreviewList.scss"
import { getAllPreviews, getAllGenres, filterByGenre, getAllStarPreviews } from "../../api/apiPreview.js";
import { useState, useEffect, useContext } from "react";
// import { useLocation } from "react-router";
import UserContext from "../../UserContext.jsx";
// import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import PreviewForm from "../PreviewForm/PreviewForm.jsx";

function PreviewList({location}) {

    const [selectedGenre, setSelectedGenre] = useState('');
    const [previewList, setPreviewList] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [componentTitle, setComponentTitle] = useState('');
    const [previewForm, setPreviewForm] = useState('');
    const [isPlus, setIsPlus] = useState(true);
    // ici tu récupères tout l'objet => {userIs, loginProvider, logoutProvider}
    // pour cela que tu dois faire userIs.userIs
    // essai de faire {userIs} pour voir si tu y accède en direct ;) 
    const {userIs} = useContext(UserContext)

    console.log('role après context', userIs);
    console.log(genreList);
    

    // let location = useLocation().pathname;
    // console.log(location); // ex : /compositions
    

    async function getPreviewList() {
        if (location === '/compositions') {
            const allPreviewList = await getAllPreviews();
            setPreviewList(allPreviewList);
            setComponentTitle('Tous les extraits');
            getGenreList();
        } else {
            const allStarPreviews = await getAllStarPreviews();
            console.log('allstarpreviews : ', allStarPreviews);
            setPreviewList(allStarPreviews);
            setComponentTitle('Quelques extraits')
        }
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
        // console.log('genre : ',genre);
        setSelectedGenre(genre);
        // console.log('selectedGenre : ', selectedGenre);

        if (genre == "") {
            getPreviewList();
        } else {
            getPreviewByGenreFilter(genre);
        }
    }

    function handleAdd(e) {
        e.preventDefault();
        if (previewForm === '') {
            setPreviewForm(<PreviewForm genreList={genreList}/>)
        } else {
            setPreviewForm('');
        }
        setIsPlus(!isPlus);
    }


    useEffect(() => {
        getPreviewList();
    }, [])

    // test genres en dur pour map ensuite
    // const genres = ["pop", "rock", "classique"]
    const audioscr = "/src/assets/RAYE.mp3"

    return (
        <>
                <h1 className="preview__list__title">{componentTitle}</h1>
                {location == '/compositions' && 
                <div className="preview__list__form__container">
                    {/* on a notre formulaire pour sélectionner un genre */}
                    <Form.Select size="lg" onChange={handleChange} className="genre__menu toggle-button" aria-label="Sort by genre">
                        
                        <option className="option-icon genre__item" value=''>Trier par genre</option>
                        {/* On map sur la liste des genres */}
                        {genreList.length != 0 && genreList.map((genre) => (
                            // On affiche le genre (genreList[index])
                            <option value={genre.label} key={genre.id} className="genre__item">{genre.label.charAt(0).toUpperCase() + genre.label.slice(1)}</option>
                        ))}
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
                }


                <section className="preview__list">
                    {/* Ici, on map sur la liste des extraits */}
                    {previewList.length > 0 ? previewList.map((preview) => (
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

                {userIs === 'admin' &&
                <div>
                    <section className="admin__plus">
                        <button onClick={handleAdd} className="button__plus">
                            {isPlus === true ?
                            <i className="plus__icon fs-1 bi bi-plus-square-fill"></i>
                            :
                            <i className="minus__icon fs-1 bi bi-dash-square-fill"></i>
                            }
                        </button>
                    </section>
                    <section className="preview__form">
                        {previewForm}
                    </section>
                </div>
                }
        </>
    )

}

export default PreviewList;