import api_axios from "./axiosConfig";

// Lister toutes les entreprises
// GET /api/admin/company
// companyRoute.get('/admin/company', companyController.findAll)
export async function getAllCompany() {
    return api_axios
        .get(`/admin/company`)
        .then(function (res) {
            // console.log("api console :", res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Voir mes informations d'entreprise
export async function getMyCompany() {
    return api_axios
        .get(`/company/companyProfile`)
        .then(function (res) {
            // console.log("api console :", res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Ajouter une entreprise
// POST /api/company
// companyRoute.post('/company', companyController.create)
export async function createCompany(newCompanyData) {
    return api_axios
        .post(`/company`, newCompanyData)
        .then(function (res) {
            console.log(res.data);
            window.location.reloead();
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Modifier une entreprise
// PATCH /api/company/:idCompany
// companyRoute.patch('/company/:id', companyController.update)
export async function updateCompany(newCompanyData) {
    return api_axios
        .patch(`/company`, newCompanyData)
        .then(function (res) {
            console.log("api console :", newCompanyData);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Supprimer une entreprise
// DELETE /api/company/:idCompany
// companyRoute.delete('/company/:id', companyController.delete)
export async function deleteCompany() {
    return api_axios
        .delete(`/company`)
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
