import axios from "axios";
import { configure } from "axios-hooks";
import { refreshToken } from "./apiUser.js";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import UserContext from "../UserContext.jsx"; // ← AJOUT
import { useContext } from "react"; // ← AJOUT

const API_URL = import.meta.env.VITE_API_URL;

const api_axios = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

configure({ axios: api_axios });

let refreshPromise = null;

export const useAxiosInterceptor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userIs } = useContext(UserContext); // ← RÉCUPÉRATION DU CONTEXTE

    const isAdmin = userIs === 'admin'; // ← DÉFINITION userIsAdmin

    useEffect(() => {
        const redirectLoginOrKeep = () => {
            const path = location.pathname || "/";

            const validPaths = [
                "/", "/compositions", "/contact", 
                "/legales", "/cgu", "/accessibility"
            ];

            // ✅ Pages publiques : on reste
            if (validPaths.includes(path)) {
                navigate(path, { replace: true });
                return;
            }

            // ✅ Pages protégées sans connexion → login
            if (userIs === 'visitor' && (path === "/user" || path === "/user/settings" || path === "/admin")) {
                navigate("/login", { replace: true });
                return;
            }

            // ✅ Redirection par défaut selon rôle
            const defaultPath = isAdmin ? "/admin" : "/user";
            navigate(defaultPath, { replace: true });
        };

        const interceptor = api_axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error?.config;

                if (!error.response) {
                    console.warn("Pas de réponse serveur (cookies supprimés ?)");
                    redirectLoginOrKeep();
                    return Promise.reject(error);
                }

                const status = error.response.status;

                if (originalRequest.url.includes("/user/refresh")) {
                    console.warn("Erreur sur le refresh, redirection login");
                    redirectLoginOrKeep();
                    return Promise.reject(error);
                }

                if ([401, 403].includes(status) && !originalRequest._retry) {
                    originalRequest._retry = true;

                    if (!refreshPromise) {
                        refreshPromise = refreshToken().finally(() => {
                            refreshPromise = null;
                        });
                    }

                    try {
                        await refreshPromise;
                        return api_axios(originalRequest);
                    } catch (refreshError) {
                        console.error("Refresh token invalide ou expiré", refreshError);
                        redirectLoginOrKeep();
                        return Promise.reject(refreshError);
                    }
                }

                if ([401, 403].includes(status)) {
                    console.warn("Non authentifié, redirection login");
                    redirectLoginOrKeep();
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api_axios.interceptors.response.eject(interceptor);
        };
    }, [navigate, location, userIs, isAdmin]); // ← Dépendances complètes

    return api_axios;
};

export default api_axios;
