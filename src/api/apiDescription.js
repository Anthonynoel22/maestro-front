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

// créer la liste des description
// POST /api/admin/description
//descriptionRoute.post('/admin/description', imageUpload.single('image'), descriptionController.create)

export async function create(formData) {
    return api_axios
        .post('/admin/description', formData, {
                header: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(function (res) {
            // console.log("res.data : ", res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Mettre à jour une liste des description
// PATCH /api/admin/description/:id
//descriptionRoute.patch('/admin/description/:id', imageUpload.single('image'), descriptionController.update)

export async function update(id, newDescriptionData) {
    return api_axios
        .patch(`/admin/description/${id}`, newDescriptionData, {
            header: { 
                'Content-Type': 'multipart/form-data' 
            }
        })
        .then(function (res) {
            console.log('updatePreview res.data : ', res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

//Supprimer une liste des description
// DELETE /api/admin/description/:id
//descriptionRoute.delete('/admin/description/:id', descriptionController.deleteDescription)

export async function deleteDescription(id) {
    return api_axios
        .delete(`/admin/description/${id}`)
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}