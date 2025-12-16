import axios from "axios";
import { configure } from "axios-hooks";
import { refreshToken } from "./apiUser.js";
import { useNavigate } from "react-router-dom"; 
import { useEffect } from "react"; 


const API_URL = import.meta.env.VITE_API_URL;

const api_axios = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

configure({ axios: api_axios });

let refreshPromise = null;

export const useAxiosInterceptor = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = api_axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error?.config;

                if (!error.response) {
                    console.warn("Pas de réponse serveur");
                    navigate("/");
                    return Promise.reject(error);
                }

                const status = error.response.status;

                if (originalRequest?.url.includes("/user/refresh")) {
                    console.warn("Refresh échoué");
                    navigate("/");
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
                        console.error("Refresh échoué");
                        navigate("/");
                        return Promise.reject(refreshError);
                    }
                }

                if ([401, 403].includes(status)) {
                    console.warn("Non authentifié");
                    navigate("/");
                }

                return Promise.reject(error);
            }
        );

        return () => api_axios.interceptors.response.eject(interceptor);
    }, [navigate]);

    return api_axios;
};

export default api_axios;