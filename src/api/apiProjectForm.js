
import api_axios from "./axiosConfig.js";


// ajouter/faire une demande de project
// POST /api/project
// projectRouter.post('/project', projectsController.askProject)

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


