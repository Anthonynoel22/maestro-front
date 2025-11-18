// import { useContext } from "react";
// import UserContext from "../../UserContext.jsx";
import PreviewList from "../../components/PreviewList/PreviewList.jsx";

function Composition() {

        // LES COMPOSANTS QUI SERONT SUR LA PAGE:
        
        // Liste des compositions (previews)
        // => PreviewList

        // const userIs = useContext(UserContext)

        // console.log(userIs);
        const locationComposition = "/compositions";

    return (
        <>
        <PreviewList location={locationComposition}/>
        </>
    )
}

export default Composition;