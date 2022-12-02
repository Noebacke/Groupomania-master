import { URL_GET_USER } from '../../config';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import userApi from '../../services/userApi';

const UpdateProfilPassword = () => {
    // Objet contenant  le mot de passe saisi
    const [updateProfil, setUpdateProfil] = useState({
        password:"",
        
    });
    const [user, setUser] = useState([])
    // Récupération des données de l'utilisateur pour les mettre dans un tableau ( ligne 12)
    useEffect( () => {
        axios.get(URL_GET_USER)
        .then( res => {
            const profil = res.data
            console.log(profil);
            setUser(profil)
            
        })
        .catch( "Une erreur est survenue lors du chargement de la page")
    }, []);
    // Permet la récupération des données saisie dans le champ
    const handleChange = (event)=>{
        const currentTarget = event.currentTarget;
        const { value } = currentTarget;
        console.log("value",value);
        setUpdateProfil({
            password:value
        })
    }
    // Permet l'exploitation des données précédement récupérées après avoir été saisies
    const handleSubmit = async (event)=>{
        // Permet d'effectuer des actions même après de l'update du password comme afficher une alerte
        event.preventDefault()
        try {
            await userApi.update(updateProfil)
            alert('Password mis à jour')
            window.location.reload(); 
        }catch(error){
            console.log(error, "Le Changement de nom n'a pas abouti");
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
                    type="password"
                    onChange={handleChange}
                ></input>
                <br />
                <button onClick={handleSubmit} className="submit-modifications-profil">Effectuer le changement</button>
            </form>
        </div>
    );
};

export default UpdateProfilPassword;