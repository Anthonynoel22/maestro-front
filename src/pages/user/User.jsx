import ProjectForm from "../../components/ProjectForm/ProjectForm.jsx";
import ProjectList from "../../components/ProjectList/ProjectList.jsx";
import UserContext from "../../UserContext.jsx";
import { useContext } from "react";

function User() {
    const {userIs} = useContext(UserContext)


    // LES COMPOSANTS QUI SERONT SUR LA PAGE:

    // Formulaire de demande de projet
    // => ProjectForm
    // Liste des projets avec statut
    // => ProjectList (version client)
console.log(userIs);

    return (
        <>
        <ProjectForm />
        <ProjectList />
        </>
    )
}

export default User;