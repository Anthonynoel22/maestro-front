import "./Preview.scss";

function Preview({title, genres}) {



    return (
        <>
        <article className="preview">
            <div className="preview__container">
                <figure className="preview__title__container">
                    <figcaption className="preview__title">{title}</figcaption>
                    <audio controls src="null"></audio>
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