import UserContext from "./UserContext.jsx";
import { useState, useEffect } from "react";
import { getMyProfile } from "./api/apiUser.js"; 

export function UserProvider({ children }) {
    const [userIs, setUserIs] = useState(() => sessionStorage.getItem('userRole') || 'visitor');
    const [refreshList, setrefreshList] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // éviter les appels multiples

    // Au montage : vérifie si token et récupère le profil
    useEffect(() => {
        const initUser = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (token && userIs === 'visitor') {
                    const profile = await getMyProfile();
                    if (profile.user.role) {
                        setUserIs(profile.user.role);
                    }
                }
            } catch (error) {
                console.log('Token invalide/expiré, reste visitor', error);
                // Token expiré on Nettoie
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('userRole');
            } finally {
                setIsLoading(false);
            }
        };

        initUser();
    }, []); //  Une seule fois au montage

    useEffect(() => {
        sessionStorage.setItem('userRole', userIs);
    }, [userIs]);

    // Tes fonctions existantes
    function needRefreshProjectList() { setrefreshList(true); }
    function desactiveRefreshProjectList() { setrefreshList(false); }
    function loginProvider(role) { setUserIs(role); }
    function logoutProvider() { 
        setUserIs('visitor');
        sessionStorage.removeItem('token'); //  Nettoie aussi le token
    }

    // Pendant le chargement, on n'affiche un loader
    if (isLoading) {
        return <div>Chargement...</div>; 
    }

    return (
        <UserContext.Provider value={{
            userIs, 
            loginProvider, 
            logoutProvider,
            refreshList, 
            needRefreshProjectList, 
            desactiveRefreshProjectList
        }}>
            {children}
        </UserContext.Provider>
    );
}