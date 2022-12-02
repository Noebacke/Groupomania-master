import { URL_COMMENTS } from "../config";
const { default: axios } = require("axios");
// Fonction création d'un commentaire partie route
function create(comment) {
    axios.post(URL_COMMENTS, comment);
}
// Export de la fonction
export default {
    create,
};