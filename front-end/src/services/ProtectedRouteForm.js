import { Navigate, Outlet } from "react-router-dom";

// Fonction permettant l'accès à la page principale uniquement si la personne est connectée ( si un token est actif et est valide)
const ProtectedRoute = () => {
    const tokenLocalStorage = localStorage.getItem('token')
    return !tokenLocalStorage ? <Outlet/> : <Navigate to={"/getallpost"}/>;
};

export default ProtectedRoute;