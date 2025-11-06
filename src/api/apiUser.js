import api_axios from "./axiosConfig";

// S'inscrire (nouvel utilisateur)
// POST/api/user
// userRoute.post("/user", userController.create);
export async function create(userRegister) {
    return api_axios
        .post(`/user`, userRegister)
        .then(function (res) {
            // console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
// Se connecter
export async function loginUser(userData) {
    return api_axios
        .post(`/user/login`, userData)
        .then(function (res) {
            console.log("res.data du login : ", res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Rafraichir le token
// POST/api/user/refresh
// userRoute.post("/user/refresh", userController.refresh);

// Se déconnecter
// POST/api/user/logout
// userRoute.post("/user/logout", userController.logout);

// Voir ses informations personnelles
export async function getMyProfile() {
    return api_axios
        .get(`/user/profile`)
        .then(function (res) {
            // console.log("api console :", res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Modifier ses informations
export async function updateMyProfile(newUserData) {
    return api_axios
        .patch(`/user`, newUserData)
        .then(function (res) {
            console.log("api console :", newUserData);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Supprimer un utilisateur (désactiver)
// DELETE/api/user
// userRoute.delete('/user', userController.quelque chose)

// Voir la liste des utilisateurs

export async function getAllUsers() {
    return api_axios
        .get(`/admin/user`)
        .then(function (res) {
            // console.log("api console :", res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Trier les utilisateurs
// GET/api/admin/user/(filtre)
// userRoute.get("/admin/user/filter", userController.sort);

// Voir un seul utilisateur
export async function getOneUser(id) {
    return api_axios
        .get(`/admin/user/${id}`)
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
