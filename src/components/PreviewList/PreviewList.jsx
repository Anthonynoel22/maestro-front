import Preview from "../Preview/Preview.jsx";
import "./PreviewList.scss"
import { getAllPreviews, getAllGenres, filterByGenre, getAllStarPreviews } from "../../api/apiPreview.js";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext.jsx";
import Form from 'react-bootstrap/Form';
import PreviewForm from "../PreviewForm/PreviewForm.jsx";
import UpdatePreviewForm from "../UpdatePreviewForm/UpdatePreviewForm.jsx";
import Accordion from 'react-bootstrap/Accordion';
import { PlusSquareFill, DashSquareFill } from "react-bootstrap-icons";

function PreviewList({location}) {

    const [selectedGenre, setSelectedGenre] = useState('');
    const [previewList, setPreviewList] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [componentTitle, setComponentTitle] = useState('');
    const [previewForm, setPreviewForm] = useState('');
    const [isPlus, setIsPlus] = useState(true);

    // gestion Accordion
    const [activeItem, setActiveItem] = useState(null);
    const [selectedPreview, setSelectedPreview] = useState(null);


    // ici tu récupères tout l'objet => {userIs, loginProvider, logoutProvider}
    // pour cela que tu dois faire userIs.userIs ou {userIs}
    const {userIs} = useContext(UserContext)

    console.log('role après context', userIs);
    console.log(genreList);
    

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
        setSelectedGenre(genre);

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

    function toggleItem(preview) {
        const key = String(preview.id);
        // bascule l'item actif et met à jour selectedPreview : si on reclique sur le même, on ferme et on supprime selectedPreview
        setActiveItem(prev => (prev === key ? null : key));
        setSelectedPreview(prev => (prev && prev.id === preview.id ? null : preview));
    }

    const handleSaved = () => {
        // ferme l'accordéon et rafraîchit la liste
        setActiveItem(null);
        setSelectedPreview(null);
        getPreviewList();
    }

    useEffect(() => {
        getPreviewList();
    }, [])

    // test genres en dur pour map ensuite
    // const genres = ["pop", "rock", "classique"]
    // const audioscr = "/src/assets/RAYE.mp3"

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

                {/* Un Accordion autonome par preview — grille responsive */}
                <section className="preview__list">
                    {/* Ici, on map sur la liste des extraits */}
                    {previewList.length > 0 ? previewList.map((preview) => (
                        <div className="preview__item" key={preview.id}>
                        <Accordion
                            className="preview-card-accordion"
                            flush
                            activeKey={activeItem === String(preview.id) ? "0" : null}
                        >
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <div className="preview__item__header d-flex justify-content-between align-items-center w-100">
                                        <div className="preview__summary">
                                            <Preview audiosrc={preview.link} title={preview.title} genres={preview.listGenres}/>
                                        </div>
                                        {/* controls à droite : collapse + edit */}
                                        <div className="preview__controls">
                                            {userIs === 'admin' &&
                                                <>
                                                    <span
                                                        role="button"
                                                        tabIndex={0}
                                                        className="collapse-button btn btn-link"
                                                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleItem(preview); }}
                                                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); toggleItem(preview); } }}
                                                        aria-label={activeItem === String(preview.id) ? `Fermer ${preview.title}` : `Ouvrir ${preview.title}`}
                                                    >
                                                        <i className={`fs-4 bi ${activeItem === String(preview.id) ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                                                    </span>

                                                    <span
                                                        role="button"
                                                        tabIndex={0}
                                                        className="edit-button btn btn-link"
                                                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleItem(preview); }}
                                                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); setActiveItem(String(preview.id)); setSelectedPreview(preview); } }}
                                                        aria-label={`Modifier ${preview.title}`}
                                                    >
                                                        <i className="pencil-icon fs-4 bi bi-pencil-square"></i>
                                                    </span>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {userIs === 'admin' &&
                                        <UpdatePreviewForm id={preview.id} preview={preview} genreList={genreList} onSaved={handleSaved} />
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                )) : <p>Pas d'extraits</p>}
                </section>
                {(userIs === 'admin' && location === '/compositions') &&
                <div>
                    <section className="admin__plus">
                        <button onClick={handleAdd} className="button__plus">
                            {isPlus === true ?                       
                                <PlusSquareFill size={40} className="plus__icon" />                                               
                            :
                                <DashSquareFill size={40} className="minus__icon" />
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