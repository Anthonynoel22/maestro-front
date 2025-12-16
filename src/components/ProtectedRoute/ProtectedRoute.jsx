import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../UserContext.jsx";

export default function ProtectedRoute({ allowedRoles = ["client", "admin"] }) {
    const { userIs } = useContext(UserContext);

    // Si pas connecté  on redirige /login
    if (userIs === "visitor") {
        return <Navigate to="/login" replace />;
    }

    // Si rôle non autorisé  on redirige /404 
    if (!allowedRoles.includes(userIs)) {
        return <Navigate to="*" replace />; 
    }

    // Autorisé → affiche les enfants
    return <Outlet />;
}
