const { default: axios } = require("axios");
const { URL_POSTS } = require("../config");

// Fonction créer un post partie route
function create(post) {
    return axios.post(URL_POSTS, post)
}
// Fonction update un post partie route
function update (post) {
    const postId = window.location.search.slice(1);
    return axios.put(URL_POSTS +  `/${postId}`, post)
}
// Fonction afficher un post en particulier partie route
function getOne (post) {
    const postId = window.location.search.slice(1);
    return axios.get(URL_POSTS + `/${postId}`, post)
}
//Export des différentes fonctions
export default {
    create,
    update,
    getOne,
};





