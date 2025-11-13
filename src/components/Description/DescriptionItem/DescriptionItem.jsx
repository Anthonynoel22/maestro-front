//  le composant enfant DescriptionItem affiche un bloc contenant un titre, une image et un texte, tous extraits de la prop description
function DescriptionItem({ description }) {
    return (
        <div className="description__container">
            <h2 className="description__title">{description.title}</h2>
            <img
                className="description__image"
                /*Si description.image_link vaut "app/images/photo.jpg", alors :
                .replace(/^app\//, "") donne "images/photo.jpg"
                L’URL finale devient : "http://localhost:3000/images/photo.jpg" */

                src={`http://localhost:3000/${description.image_link.replace(/^app\//,"")}`}
                alt="présentation du compositeur"
            />
            <p className="description__text">{description.text}</p>
        </div>
    );
}

export default DescriptionItem;

