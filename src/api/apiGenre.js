import api_axios from "./axiosConfig";

// Lister tous les genres
// GET /api/admin/genre
//genreRoute.get('/admin/genre', genresController.getAllGenres)

export async function getAllGenres() {
    return api_axios
        .get(`/admin/genre`)
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log( error);
        });
}

// Ajouter un genre
// POST /api/admin/genre
//genreRoute.post('/admin/genre', genresController.addAGenre)

export async function addAGenre(label) {
    return api_axios
        .post(`/admin/genre`, { label })
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log( error);
        });
}

// Modifier un genre
// PATCH /api/genre/:idGenre
//genreRoute.patch('/admin/genre/:id', genresController.updateGenre)

export async function updateGenre(id, label) {
    return api_axios
        .patch(`/admin/genre/${id}`,{label})
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log( error);
        });
}

// Supprimer un genre
// DELETE /api/genre/:idCGenre
//genreRoute.delete('/admin/genre/:id', genresController.deleteGenre)

export async function deleteGenre(id) {
    return api_axios
    .delete(`/admin/genre/${id}`)
    .then(function(res) {
        console.log(res.data);
        return res.data;
    })
    .catch(function(error) {
        console.log( error);
    });
}


