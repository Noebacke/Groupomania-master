import { useParams } from 'react-router-dom';
import { URL_GET_USER } from '../../config';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import userApi from '../../services/userApi';

const UpdateProfilEmail = () => {
    // Tableau pour contenir les nouvelles données de l'email qui seront put sur l'ancien
    const [updateProfil, setUpdateProfil] = useState({
        email:"",
        
    });
    const [user, setUser] = useState([])
    // Fonction pour récupérer les données de l'utilisateur
    useEffect( () => {
        axios.get(URL_GET_USER)
        .then( res => {
            const profil = res.data
            console.log(profil);
            setUser(profil)
            
        })
        .catch( "Une erreur est survenue lors du chargement de la page")
    }, []);
    // handlechange permet de récupérer les données rentrées dans le champ de saisie
    const handleChange = (event)=>{
        const currentTarget = event.currentTarget;
        const { value } = currentTarget;
        setUpdateProfil({
            email: value
        })
    }
    // HandleSubmit permet l'envoi des données précédement récupérées 
    const handleSubmit = async (event)=>{
        // Permet d'éviter un rafraîchissement de la page instantané permettant d'effectuer diverses évènements après une condition remplie
        event.preventDefault()
        try {
            // Si l'update à bien été effectué, une alerte apparaît et un rafraîchissement de page s'effectue
            await userApi.update(updateProfil)
            alert('Email mis à jour')
            window.location.reload(); 
        }catch(error){
            console.log(error, "Le Changement de mail n'a pas abouti");
        }
    }
    return (
        <div>
            <form className="form-update">
                <h3>Modification</h3>
                <input
                    name="input-update-profil"
                    className="input-update-profil"
                    required
                    type="email"
                    onChange={handleChange}
                ></input>
                <br />
                <button onClick={handleSubmit} className="submit-modifications-profil">Effectuer le changement</button>
            </form>
        </div>
    );
};

export default UpdateProfilEmail;