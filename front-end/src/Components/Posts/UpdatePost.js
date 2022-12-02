import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import NavBar from '../../NavBar/NavBar';
import { URL_POSTS } from '../../config';
import postApi from '../../services/postApi';
import Axios from 'axios';

const UpdatePost = () => {
    const [updatePost, setUpdatePost] = useState({
        title:"",
        description:""
    });
    const [posts, setPosts] = useState([]);
    const [file, setFile] = useState();
    const [postPicture, setPostPicture] = useState(null);
    const navigate = useNavigate();

    // Permet de récupérer les données rentrées dans le champ pour changer le titre de son post
    const handleChangeTitle = (event) => {
        const currentTarget = event.currentTarget
        const {value} = currentTarget
        console.log("value title", value);
        setUpdatePost({
            ...updatePost,
            title:value
            
        })
    };

    const handleChangeDescription = (event) => {
        const currentTarget = event.currentTarget
        const {value} = currentTarget
        console.log("value description", value);
        setUpdatePost({
          // les "..." signifient que l'ont récupères toutes les données reçues sans tri
            ...updatePost,
            description:value
            
        })
    };
    const handlePicture = (event)=>{
        setPostPicture(URL.createObjectURL(event.target.files[0]));
        setFile(event.target.files[0]);
    }
    const handleSubmit = async (event)=>{
        event.preventDefault()
        const formData = new FormData ();
        formData.append("post",JSON.stringify(updatePost));
        console.log("file", file);
        console.log("formData", formData.get('post'));
        if (file) formData.append("file", file);
        try {
            await postApi.update(formData)
            alert('Post mis à jour')
            navigate('/getallpost')
        }catch(error){
            console.log(error, "Le post n'a pas pu être crée");
        }
    }
    const handleSubmitBack = async ()=>{
      navigate('/')
    }
    return (
      <div>
        <div>
            <NavBar />
        </div>
        <button className='back' onClick={handleSubmitBack}>Retour au menu</button>
        <div>
          <form className="form-conteneur">
            <h3>Modification du post</h3>
            <br />
            <label className="label-create-post">
              Titre
              <input
                className="title"
                required
                onChange={handleChangeTitle}
              ></input>
            </label>
            <br />
            <label className="label-create-post">
              Description
              <input
                className="description"
                required
                onChange={handleChangeDescription}
              ></input>
            </label>
            <br />
            <label className="label-create-post">
              Images
              <br />
              <br />
              <input
                className="img-of-newpost"
                name="file"
                type="file"
                accept=".jpg, .jpeg, .png"
                alt="img-of-post"
                onChange={(event) => handlePicture(event)}
              ></input>
            </label>
            <br />
            <br />
            <img src={postPicture} alt="img-of-update" />
            <br />
            <br />
            <button className="update-post" onClick={handleSubmit} ariaUpdatePost="button-create-update">
              Modifier le post
            </button>
          </form>
        </div>
      </div>
    );
};

export default UpdatePost;