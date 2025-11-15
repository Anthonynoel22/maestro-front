import React, { useEffect, useState, useContext } from "react";
import Description from "../../components/Description/Description.jsx";
import DescriptionItem from "../../components/Description/DescriptionItem/DescriptionItem.jsx";
import DescriptionForm from "../../components/DescriptionForm/DescriptionForm.jsx";
import PreviewList from "../../components/PreviewList/PreviewList.jsx";
import { getAllDescription } from "../../api/apiDescription.js";
import UserContext from "../../UserContext.jsx";

const locationHome = "/";

function Home() {
    const [descriptions, setDescriptions] = useState([]);
    const { userIs } = useContext(UserContext);

    useEffect(() => {
        getAllDescription()
            .then((data) => setDescriptions(data))
            .catch((err) => console.error(err));
    }, []);

    function refreshDescriptions() {
        getAllDescription()
            .then((data) => setDescriptions(data))
            .catch((err) => console.error(err));
    }

    // Filtrage : séparation par "number"
    const presentationCompositeur = descriptions.filter((d) => d.number === 1);
    const prestation = descriptions.filter((d) => d.number === 2);

    return (
        <>
            {/* Présentation du compositeur */}
            {presentationCompositeur.map((description) => (
                <DescriptionItem description={description}
                 onAction={refreshDescriptions} />
            ))}

            {/* Compositions stars */}
            <PreviewList location={locationHome} />

            {/* Prestation */}
            {prestation.map((description) => (
                <DescriptionItem  description={description} onAction={refreshDescriptions}  />
            ))}

            {/* Formulaire d'administration */}
            {userIs === "admin" && (
                <section>
                    <DescriptionForm onAction={refreshDescriptions} />
                </section>
            )}
        </>
    );
}

export default Home;

