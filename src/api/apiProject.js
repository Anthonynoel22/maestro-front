import api_axios from "./axiosConfig.js";

// import axios from "axios";

// const API_URL = "http://localhost:3000/api";


export async function createProject(projectData) {
    return (
        api_axios
            // premier argument = "/api/project" : c'est l'URL de la route API project du serveur
            // deuxième argument = projectData : c'est la données du corps de la requête
            .post(`/project`, projectData)
            .then(function (response) {
                console.log("Projet créé :", response.data);
                return response.data;
            })

            .catch(function (error) {
                console.error("Erreur lors de la création du projet :", error);
            })
    );
}
