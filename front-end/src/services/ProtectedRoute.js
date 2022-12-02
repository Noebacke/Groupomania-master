import { Navigate, Outlet } from "react-router-dom";

//Fonction permettant le retour à la page de connexion si le token n'est plu actif, ou si il n'y en a pas
const ProtectedRoute = () => {
    return localStorage.getItem('token') ? <Outlet/> : <Navigate to={"/"}/>;
};

export default ProtectedRoute;