const { default: axios } = require("axios");
const { URL_SIGNUP, URL_GET_USER } = require("../config");

// Fonction crée un utilisateur partie route
function create(user) {
    return axios.post(URL_SIGNUP, user)
    
}
// Fonction update des paramètres d'utilisateurs partie route
function update (user) {
    return axios.put(URL_GET_USER +  `/update`, user)
}
// Fonction supprimer son compte partie route
function deleteUser (user) {
    const userId = window.location.search.slice(1);
    return axios.delete(URL_GET_USER +  `/${userId}`, user)
}
// Export des différentes fonctions
export default {
    create, 
    update,
    deleteUser
};