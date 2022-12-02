import {useNavigate} from 'react-router-dom'
import React, { useState } from 'react';
import postApi from '../../services/postApi';
import NavBar from '../../NavBar/NavBar';


const CreatePost = () => {
    const [newPost, setNewPost] = useState({
      title: "",
      description: "",
    });
    const [posts, setPosts] = useState([]);
    const [file, setFile] = useState();
    const [postPicture, setPostPicture] = useState(null);
    // Navigate est une fonction permettant la navigation vers un lien donné
    const navigate = useNavigate();
    // Récupération des données d'une photo saisie
    const handlePicture = (event) => {
      setPostPicture(URL.createObjectURL(event.target.files[0]));
      console.log("file",postPicture);
      setFile(event.target.files[0]);
      
    };
    // Récupération des données du titre d'un post avant de les envoyer dans un tableau via un hook
    const handleChangeTitle = (event) => {
      const currentTarget = event.currentTarget;
      const { value } = currentTarget;
      console.log("value title", value);
      setNewPost({
        ...newPost,
        title: value,
      });
    };
    // Récupération des données de la description d'un post avant de les envoyer dans un tableau via un hook
    const handleChangeDescription = (event) => {
      const currentTarget = event.currentTarget;
      const { value } = currentTarget;
      console.log("value description", value);
      setNewPost({
        ...newPost,
        description: value,
      });
    };
    // Fonction qui permettra un retour à la page d'acceuil
    const handleSubmitBack = async ()=>{
      navigate('/')
    }
    // Fonction qui envoit la totalités des données rentrées par l'utilisateur dans sa création de post avant d'être renvoyé sur la page d'acceuil si tout s'est bien déroulé
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("post", JSON.stringify(newPost));
      if (file) {formData.append("file", file)};
      try {
        await postApi.create(formData);
        navigate("/getallpost");
      } catch (error) {
        console.log(error, "Le post n'a pas pu être crée");
      }
    };
    return (
      <div>
        <div>  
            <NavBar />
        </div>
        <button className='back' onClick={handleSubmitBack}>Retour au menu</button>
        <form className="form-conteneur" ariaFormPost='Form-create-post'>
          <h3>Création du post</h3>
          <br />
          <label className="label-create-post">
            Titre
            <br />
            <input
              className="title"
              required
              size={20}
              onChange={handleChangeTitle}
            > 
            </input>
          </label>
          <br />
          <label className="label-create-post">
            Description
            <br />
            <input
              className="description"
              required
              onChange={handleChangeDescription}
            ></input>
          </label>
          <br />
          <label className="label-create-post">
            Image
            <br />
            <br />
            <input
              className="img-of-newpost"
              name="images"
              type="file"
              accept=".jpg, .jpeg, .png"
              alt="img-of-post"
              onChange={(event) => handlePicture(event)}
            ></input>
          </label>
          <br />
          <br />
          <img src={postPicture} alt="picture-of-post" />
          <br />
          <br />
          <button onClick={handleSubmit} ariaPublishPost='button-publish-post' className='button-publish-post'>Publier le post</button>
        </form>
      </div>
    );
};

export default CreatePost;