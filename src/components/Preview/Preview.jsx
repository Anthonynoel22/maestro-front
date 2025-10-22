import "./Preview.scss";
import { useState } from "react";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Preview({title, audiosrc, genres}) {

    const [audioElement, setAudioElement] = useState();
    const [playIsHidden, setPlayIsHidden] = useState(false);
    const [pauseIsHidden, setPauseIsHidden] = useState(true);

    function toggleHidden() {
        setPlayIsHidden(!playIsHidden);
        setPauseIsHidden(!pauseIsHidden);
    }

    function handlePlay() {
        audioElement.play();
        toggleHidden();
    }

    function handlePause() {
        audioElement.pause();
        toggleHidden();
    }

    useEffect(() => {
        setAudioElement(new Audio(audiosrc));
    }, [audiosrc])

    return (
        <>
        <article className="preview">
            <div className="preview__container">
                <figure className="preview__figure">
                    <figcaption className="preview__title">{title}</figcaption>
                    <audio className="audio">
                        {/* à mettre la source dynamiquement, et le type */}
                        {/* <source src={audiosrc} type="audio/mpeg"/> */}
                    </audio>
                </figure>
                <div className="buttons">
                    <div className={playIsHidden ? "button button__play hidden" : "button button__play"} onClick={handlePlay} id="play">
                        {/* <img className="icon" src="/src/assets/play-svgrepo-com.svg" alt="play button" /> */}
                        <i className="icon bi bi-play fs-1"></i>
                    </div>
                    <div className={pauseIsHidden ? "button button__pause hidden" : "button button__pause"} onClick={handlePause} id="pause">
                        {/* <img className="icon" src="/src/assets/pause-svgrepo-com.svg" alt="pause button" /> */}
                        <i className="icon bi bi-pause fs-1"></i>
                    </div>
                </div>
            </div>
            <div className="preview__genre__container">
                {
                    // on va chercher dans genres pour afficher dynamiquement (pour le moment avec les données en dur)
                    genres.map((genre, index) => (
                        <span key={index} className="preview__genre">{genre}</span>
                    ))
                }
                {/* <span className="preview__genre">Rock</span>
                <span className="preview__genre">Pop</span>
                <span className="preview__genre">Classique</span> */}
            </div>
        </article>
        </>
    )

};

export default Preview;