import "./Preview.scss";

function Preview({title, genres}) {

    const audio = document.getElementById("audio");
    const play = document.querySelector('.button__play');
    const pause = document.querySelector('.button__pause');

    function toggleHidden() {
        play.classList.toggle('hidden');
        pause.classList.toggle('hidden');
    }

    function handlePlay() {
        // audio.play();
        toggleHidden();
    }

    function handlePause() {
        // audio.pause();
        toggleHidden();
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
                    <div className="buttons">
                        <div className="button button__play" onClick={handlePlay} id="play">
                            <img id="play__icon" src="/src/assets/play-svgrepo-com.svg" alt="" />
                        </div>
                        <div className="button button__pause hidden" onClick={handlePause} id="pause">
                        
                        </div>
                    </div>
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