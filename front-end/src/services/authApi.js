import axios from "axios";
import { URL_LOGIN } from "../config";

// Fonction d'authentification de l'utilisateur, si les conddtions sont remplies les données sont envoyées dans le local storage ( très peu sécurisé donc à éviter)
function authenticate(credentials){
    return axios.post(URL_LOGIN, credentials)
    .then(res => res.data)
    .then(data => {
        localStorage.setItem("token",data.token)
        localStorage.setItem("admin",data.admin)
        localStorage.setItem("name",data.user_name)
        axios.defaults.headers["authorization"] =data.token
        console.log("data.token.admin",data.token);
        
        return data
    })
}


// Export de la fonction
export default {
    authenticate
};