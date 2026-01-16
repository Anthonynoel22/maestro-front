import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../UserContext.jsx";

export default function ProtectedRoute({ allowedRoles = ["client", "admin"] }) {
    const { userIs } = useContext(UserContext);

    // Si pas connecté  on navigue sur /login
    if (userIs === "visitor") {
        return <Navigate to="/login" replace />;
    }

    // Si rôle non autorisé  on navigue sur /403
    if (!allowedRoles.includes(userIs)) {
        return <Navigate to="/403" replace />; 
    }

    // Autorisé à affiche les enfants
    return <Outlet />;
}
