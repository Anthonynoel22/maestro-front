import api_axios from "./axiosConfig";

// Lister tous les projects
// GET /api/project
// projectRouter.get('/project', projectsController.listProjects)

export async function getAllProjectList() {
    return api_axios
        .get(`/project`)
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log( error);
        });
}


// Trier les projets par filtre
// GET /api/project/filter?
// projectRouter.get('/project/filter', projectsController.sortByStatut)

export async function getFilteredProjectList() {
    return api_axios
        .get(`/project/filter`)
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log( error);
        });
}