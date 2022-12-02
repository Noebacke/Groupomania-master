import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL_GET_USER } from '../config';
// les props récupèrents les données passées pour les exploiter dans la fonction
const NavBar = (props) => {
  
  const [user, setUser] = useState([])
  const navigate = useNavigate()
  // Fonction qui s'active au chargement de la page, permettant d'avoir les données de l'utilisateur connecté
  useEffect( () => {
    axios.get(URL_GET_USER)
    .then( res => {
        const profil = res.data
        console.log(profil);
        setUser(profil)
        
    })
    .catch( "Une erreur est survenue lors du chargement de la page")
  }, []);
  // Fonction pour se déconnecter ( efface le token dans le local storage pour se rediriger vers la page de connexion )
  const handleClickDisconnect = () => {
    localStorage.clear()
    navigate('/')
  }
  // Fonction pour aller sur la page profil de l'utilisateur en fonction de son id et ainsi récupérer ses données
  const handleGetUser = () => {
      navigate('/profil/' + '?' + user.id)
  }
    return (
      // Partie nav bar du site
      <nav>
        <div className="nav-bar">
          <img src="./img/Groupomania.png" className="goupomania-logo" alt='logo-groupomania'></img>
          <div className="button-of-nav">
            <button className="my-profil" onClick={handleGetUser} ariaGetProfil="button-navigate-profil-page">
              <i class="fas fa-user-circle"></i>
              Mon profil
            </button>
            <button
              to="/"
              className="disconnect-link"
              onClick={handleClickDisconnect}
              ariaDisconnectProfil="button-disconnect"
            >
              <i class="fas fa-sign-out-alt"></i>
              Se déconnecter
            </button>
          </div>
        </div>
      </nav>
    );
};


export default NavBar;