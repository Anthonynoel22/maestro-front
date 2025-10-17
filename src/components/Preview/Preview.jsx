import "./Preview.scss";

function Preview({title, genres}) {

    const audio = document.getElementById(audio);
    const play = document.getElementById(play);
    const pause = document.getElementById(pause);

    function handlePlay() {
        audio.play();
    }

    function handlePause() {
        audio.pause();
    }

    return (
        <>
        <article className="preview">
            <div className="preview__container">
                <figure className="preview__title__container">
                    <figcaption className="preview__title">{title}</figcaption>
                    <audio id="audio">
                        {/* à mettre la source dynamiquement, et le type */}
                        <source src="null"/>
                    </audio>
                    <button onClick={handlePlay} id="play"></button>
                    <button onClick={handlePause} id="pause"></button>
                </figure>
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