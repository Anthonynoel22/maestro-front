import DescriptionItem from "../Description/DescriptionItem/DescriptionItem.jsx";
import "./Description.scss";

//le composant description  affiche une liste de descriptions en utilisant un composant enfant DescriptionItem, et il gère le cas où la liste est vide.
function Description({ descriptions }) {
    if (!descriptions || descriptions.length === 0) {
        return <p>Aucune description disponible.</p>;
    }

    return (
        <section>
            {descriptions.map((description) => (
                <DescriptionItem
                    key={description.id}
                    description={description}
                />
            ))}
        </section>
    );
}

export default Description;
