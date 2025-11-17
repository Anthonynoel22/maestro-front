import CompanyDataForm from "../../components/UserDataForm/Company/CompanyDataForm.jsx";
import UserDataForm from "../../components/UserDataForm/User/UserDataForm.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { getMyProfile } from "../../api/apiUser.js";
import "./Setting.scss";

function SettingPage() {
    // LES COMPOSANTS QUI SERONT SUR LA PAGE:

    // Formulaire de modification des données utilisateurs
    // => UserDataForm

    // Voir mes informations
    const [setting, setSetting] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    async function getMySetting() {
        const myProfile = await getMyProfile();
        setSetting(myProfile);
        setIsLoading(false);
        console.log("Dans ma page setting :", myProfile);
    }

    useEffect(() => {
        getMySetting();
    }, []);

    // Afficher le formulaire de creation d'entreprise
    const [addCompany, setAddCompany] = useState(false);

    function companySettingsHandleClick(event) {
        event.preventDefault();
        setAddCompany(true);
    }

    return (
        <>
            <div className="settigs-item">
                {isLoading ? (
                    <p>Chargement en cours...</p>
                ) : (
                    <div>
                        {/* <h1>Setting</h1> */}
                        <UserDataForm />
                        {setting.user.company_id != null ? (
                            // Update
                            <CompanyDataForm onUpdate={true} />
                        ) : !addCompany ? (
                            <div className="professionnel-div">
                                <p>Je suis un professionnel ?</p>
                                <button
                                    className="addCompany-button"
                                    variant="displayCompanyDataForm-button"
                                    onClick={companySettingsHandleClick}
                                >
                                    Enregistrer les informations de mon
                                    entreprise
                                </button>
                            </div>
                        ) : (
                            <CompanyDataForm onUpdate={false} />
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default SettingPage;
