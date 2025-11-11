import React, { useEffect, useState,useContext } from "react";
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

    // Récupère toutes les descriptions (compositeur, prestation, etc.)
    useEffect(() => {
        getAllDescription()
            .then((data) => setDescriptions(data))
            .catch((err) => console.error(err));
    }, []);

    // Rafraîchit après création, update ou delete
    function refreshDescriptions() {
        getAllDescription()
            .then((data) => setDescriptions(data))
            .catch((err) => console.error(err));
    }

    // Sépare les deux descriptions principales
    const presentationCompositeur = descriptions.find((d) => d.id === 1);
    const prestation = descriptions.find((d) => d.id === 2);

    return (
        <>
            {/* Présentation du compositeur */}
            {presentationCompositeur && (
                <DescriptionItem description={presentationCompositeur} />
            )}
            {userIs === "admin" && (
                <section className="description__form">
                    <h3>Ajouter une description</h3>
                    <DescriptionForm onAction={refreshDescriptions} />
                </section>
            )}

            {/* Compositions stars */}
            <PreviewList location={locationHome} />

            {/* Prestation */}
            {prestation && <DescriptionItem description={prestation} />}
            {userIs === "admin" && (
                <section className="description__form">
                    <h3>Ajouter une description</h3>
                    <DescriptionForm onAction={refreshDescriptions} />
                </section>
            )}
        </>
    );
}

export default Home;
