import CompanyDataForm from "../../components/UserDataForm/Company/CompanyDataForm.jsx";
import UserDataForm from "../../components/UserDataForm/User/UserDataForm.jsx";

function SettingPage() {
    // LES COMPOSANTS QUI SERONT SUR LA PAGE:

    // Formulaire de modification des données utilisateurs
    // => UserDataForm

    return (
        <>
            <h1>Setting</h1>
            <UserDataForm />
            <CompanyDataForm />
        </>
    );
}

export default SettingPage;
