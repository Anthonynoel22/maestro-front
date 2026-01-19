import axios from "axios";
import { configure } from "axios-hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

// Instance axios avec cookies HttpOnly (sûr pour iOS)
const api_axios = axios.create({
    baseURL: API_URL,
    withCredentials: true, // ✅ Cookies auto envoyés
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// Intercepteur REQUEST - Force credentials sur refresh iOS
api_axios.interceptors.request.use((config) => {
    if (config.url?.includes('/user/refresh')) {
        config.withCredentials = true;
    }
    return config;
});

configure({ axios: api_axios });

export const useAxiosInterceptor = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = api_axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // ❌ Pas de réponse (réseau iOS) - ne pas rediriger
                if (!error.response) {
                    console.warn("❌ Réseau iOS - pas de réponse:", {
                        url: originalRequest?.url,
                        code: error.code,
                    });
                    return Promise.reject(error);
                }

                const status = error.response.status;

                // ❌ Refresh échoue lui-même (401) - déconnexion
                if (originalRequest?.url?.includes("/user/refresh")) {
                    console.error("🔴 Refresh token mort - déconnexion");
                    navigate("/", { replace: true });
                    return Promise.reject(error);
                }

                // 401/403 + pas déjà retry = refresh automatique
                if ([401, 403].includes(status) && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        console.log("🔄 Refresh token auto...");
                        await api_axios.post('/user/refresh');
                        
                        // Rejoue la requête originale
                        return api_axios(originalRequest);
                    } catch (refreshError) {
                        console.error("❌ Refresh final échoué");
                        
                        // Nettoyage auth seulement 
                        delete api_axios.defaults.headers.common['Authorization'];
                        
                        navigate("/", { replace: true });
                        return Promise.reject(refreshError);
                    }
                }

                // Autres erreurs - propagation normale
                return Promise.reject(error);
            }
        );

        return () => {
            api_axios.interceptors.response.eject(interceptor);
        };
    }, [navigate]);

    return api_axios;
};

export default api_axios;