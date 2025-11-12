import api_axios from "./axiosConfig.js";



// Voir la liste des descriptions
export async function getAllDescription() {
    return api_axios
    // utilisation de api_axios pour faire une requête GET
    // vers l'endpoint "/description" de l'API
        .get(`/description`)
        .then(function (res) {
            console.log("api description :", res.data);
            // renvoie les données reçues
            return res.data;
        })
        .catch(function (error) {
            // affiche l'erreur
            console.log(error);
        });
}