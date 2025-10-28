import api_axios from "./axiosConfig";

// S'inscrire (nouvel utilisateur)
// POST/api/user
// userRoute.post("/user", userController.create);

// Se connecter
// export async function loginUser(userData) {
//     // userData = { 'email' : monemail , 'password' : 1234 }
//     try {
//         const res = await axios.post(`${API_URL}/user/login`, userData);
//         return res.userData;
//     } catch (error) {
//         console.error(error);
//     }
// }

export async function loginUser(userData) {
    return api_axios
        .post(`/user/login`, userData)
        .then(function (res) {
            console.log(res.data);
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
// GET/api/user/profile
// userRoute.get("/user/profile", authenticate, userController.profile);

// Modifier ses informations
// PATCH/api/user
// userRoute.patch("/user", authenticate, userController.modify);

// Supprimer un utilisateur (désactiver)
// DELETE/api/user
// userRoute.delete('/user', userController.quelque chose)

// Voir la liste des utilisateurs

export async function getAllUsers() {
    return api_axios
        .get(`/admin/user`)
        .then(function (res) {
            console.log("api console :", res.data);
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
// GET/api/admin/user/:idUser
// userRoute.get("/admin/user/:idUser", userController.findByPk);
