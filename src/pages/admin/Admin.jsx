import ContactRequestList from "../../components/ContactRequestList/ContactRequestList.jsx";
// import ClientList from "../../components/ClientList/ClientList.jsx"
function Admin() {

        // LES COMPOSANTS QUI SERONT SUR LA PAGE:
        
        // Nouvelles demandes de projets 
        // => WaitingProjectList
        // Liste des clients avec leurs informations 
        // => ClientList
        // Les projets validés (avec leur statut etc) 
        // => ProjectList (version admin)
        // Nouvelles demandes de contact 
        // => ContactRequestList

    return (
        <>
        <h1>Mon espace administrateur</h1>
        {/* <ClientList /> */}
        <ContactRequestList />
        </>
    )
}

export default Admin;