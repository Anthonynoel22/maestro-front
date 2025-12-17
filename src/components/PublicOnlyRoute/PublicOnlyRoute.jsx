import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../UserContext.jsx";

export default function PublicOnlyRoute() {
    const { userIs } = useContext(UserContext);

    // Si déjà connecté  redirection page accueil
    if (userIs !== "visitor") {
        return <Navigate to="/" replace />;
    }

    // Sinon, on laisse accéder au contenu public 
    return <Outlet />;
}