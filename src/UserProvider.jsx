import UserContext from "./UserContext.jsx";
import { useState, useEffect } from "react";

export function UserProvider({children}) {
    
    const [userIs, setUserIs] = useState(() => sessionStorage.getItem('userRole') || 'visitor');
    const [refreshList, setrefreshList] = useState(false);

    
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