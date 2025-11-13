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

    // Récupère toutes les descriptions (compositeur et prestation)
    useEffect(() => {
        getAllDescription()
            .then((data) => setDescriptions(data))
            .catch((err) => console.error(err));
    }, []);

    // Permet de recharger les descriptions après une action (création, mise à jour, suppression)
    function refreshDescriptions() {
        getAllDescription()
            .then((data) => setDescriptions(data))
            .catch((err) => console.error(err));
    }

    // je parcourt un tableau avec .find pour trouvé les id qui sont strictement égal à celle ci 
    const presentationCompositeur = descriptions.find((d) => d.number === 1);
    const prestation = descriptions.find((d) => d.number === 2);

    /* Affiche la description du compositeur .
Affiche le formulaire d’administration si l’utilisateur est admin.
Affiche la composition start.
Affiche la description de la prestation.
Affiche à nouveau le formulaire d’administration si l’utilisateur est admin. */
    return (
        <>
            {/* Présentation du compositeur */}
            {presentationCompositeur && (
                <DescriptionItem description={presentationCompositeur} />
            )}
            {userIs === "admin" && (
                <section>
                    <DescriptionForm description={presentationCompositeur} onAction={refreshDescriptions} />
                </section>
            )}

            {/* Compositions stars */}
            <PreviewList location={locationHome} />

            {/* Prestation */}
            {prestation && (
                <DescriptionItem description={prestation} />
            )}
            {userIs === "admin" && (
                <section>
                    <DescriptionForm description={prestation} onAction={refreshDescriptions} />
                </section>
            )}
        </>
    );
}

export default Home;
