import UserContext from "./UserContext.jsx";
import { useState } from "react";

export function UserProvider({children}) {
    const [userIs, setUserIs] = useState('visitor');

    function loginProvider(role) {
        setUserIs(role);
    };

    function logoutProvider() {
        setUserIs('visitor');
    }

    return (
        <UserContext.Provider value={{userIs, loginProvider, logoutProvider}}>
            {children}
        </UserContext.Provider>
    );
}