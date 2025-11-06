import Description from '../../components/Description/Description.jsx';
import PreviewList from '../../components/PreviewList/PreviewList.jsx';
//import { useEffect } from 'react';

function Home() {

    // LES COMPOSANTS QUI SERONT SUR LA PAGE:

    // Présentation du compositeur (un titre avec son image et sa description)
    // => Description (version présentation du compositeur)
    // Les compositions star
    // => PreviewList (version filtrée par isStar === true)
    // Présentation des prestations (un titre avec son image et sa description)
    // => Description (version présentation des prestations)

    const locationHome = "/";

    return (
        <>
            <h1>Home</h1>
            <Description />
            <PreviewList location={locationHome}/>
        </>
    )
}

export default Home;