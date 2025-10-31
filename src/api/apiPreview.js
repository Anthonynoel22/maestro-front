// import axios from "axios";

// const API_URL = "http://localhost:3000/api";

import api_axios from "./axiosConfig.js";

export async function getAllPreviews() {
    return api_axios
        .get(`/preview`)
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function getAllStarPreviews() {
    return api_axios
        .get('/preview/star')
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        })
}

export async function filterByGenre(genre) {
    return api_axios
    .get("/preview/filter"+'?'+'genre='+genre)
    .then(function (res) {
        // je récupère mes extraits
        console.log('data : ', res.data);
        return res.data;
    })
    .catch(function (error) {
        console.log(error);
    });
}

export async function getAllGenres() {
    return api_axios
        .get(`/genre`)
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log( error);
        });
}