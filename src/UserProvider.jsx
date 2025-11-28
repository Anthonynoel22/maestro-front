import UserContext from "./UserContext.jsx";
import { useState, useEffect } from "react";

export function UserProvider({children}) {
    // Initialisation du state depuis le sessionStorage
    const [userIs, setUserIs] = useState(() => sessionStorage.getItem('userRole') || 'visitor');
    const [refreshList, setrefreshList] = useState(false);

    // À chaque changement de rôle, le stocker dans le sessionStorage
    useEffect(() => {
        sessionStorage.setItem('userRole', userIs);
    }, [userIs]);

    function needRefreshProjectList() {
        setrefreshList(true);
    }
    function desactiveRefreshProjectList(){
        setrefreshList(false);
    }

    function loginProvider(role) {
        setUserIs(role);
    };

    function logoutProvider() {
        setUserIs('visitor');
    }

    return (
        <UserContext.Provider value={{userIs, loginProvider, logoutProvider,refreshList,needRefreshProjectList,desactiveRefreshProjectList}}>
            {children}
        </UserContext.Provider>
    );
}