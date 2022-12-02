import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from '../Posts/Post';
import NavBar from '../../NavBar/NavBar';
import { URL_POSTS } from '../../config';
import {useNavigate} from 'react-router-dom'

const GetOnePost = () => {
    const navigate = useNavigate()
    const [post, setPost] = useState([])
  // Utiliser URL search params
    // Fonction permettant de récupérer et d'afficher les données du post sur lequel on a précédement cliqué
    useEffect( () => {
        // Dans cette constante on à récupérer l'id du post contenu dans l'url de la page (1) étant le 2ème caractère après le "?"
        const postId = window.location.search.slice(1);
        axios.get(URL_POSTS + `/${postId}`)
        .then( res => {
            const Post = res.data
            console.log('Onepost', Post)
            setPost(Post)
        })
        .catch( "erreur lors du chargement du post")
    }, []);
      console.log("posts", post);
      const handleSubmitBack = async ()=>{
        navigate('/')
    }
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <button className='back' onClick={handleSubmitBack}>Retour au menu</button>
        <div className='post'>
          <div className="user">
          <div className="nav-bar-title">
              <div className="title">{post.title}</div>
            </div>
            <div className="user-name">Posté par {post.user_name}</div>
          </div>
          <div className="comment">
                {post.description}
                <img src={post.imageUrl}/>
          </div>
        </div>
      </div>
    );
};

export default GetOnePost;