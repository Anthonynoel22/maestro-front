

function DescriptionItem({ description }) {
    return (
        <div className="description__container">
            <h2 className="description__title">{description.title}</h2>
            <img
                className="description__image"
                src={`http://localhost:3000/${description.image_link.replace(/^app\//, "")}`}
                alt="présentation du compositeur"
            />
            <p className="description__text">{description.text}</p>
        </div>
    );
}

export default DescriptionItem;
