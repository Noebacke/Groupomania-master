import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DeleteButton from '../Posts/DeleteButton';
import {useNavigate} from 'react-router-dom'
import { URL_POSTS } from '../../config';
import GetAllComments from '../Comments/GetAllComments';


const Post = (props) => {
    
    const navigate = useNavigate()
    const [showComment, setShowComment] = useState(false);
    const [autorisation, setAutorisation] = useState(false);
    const admin = localStorage.getItem('admin')
    const name = localStorage.getItem('name')
    const userName = props.user_name
    console.log("props.username",props.user_name);
    // Fonction permettant de savoir si on est en mode admin, ou si on est en mode classique afin de déterminer les droits de chacuns sur les posts
    const getAutorisation = () => {
        if(admin == "true"){
          return setAutorisation(true)
        } 
        if(name == userName){
          return setAutorisation(true)
        }
        return setAutorisation(false)
    }
    
    
    useEffect( () => {
      getAutorisation()
    }, []);
    // Permet de voyager jusqu'a la page qui affichera le post choisi via son ID pour le supprimer
    const handleUpdatePost = () => {
        navigate('/updatepost/' + '?' + props.id ) 
    }
    // Permet de voyager jusqu'a la page qui affichera le post choisi via son ID pour le get 
    const handleGetPost = () => {
        navigate("/post/" + '?' + props.id )
    }


    return (
      <div>
        <div className="post">
          <div className="user">
            <div className="nav-bar-title">
              <div className="title">{props.title}</div>
            </div>
            <div className="user-name">Posté par {props.user_name}</div>
          </div>
          <button onClick={handleGetPost} className="get-post" ariaGetPost="button-get-post">
            <div className="comment">{props.description}</div>
            <img src={props.imageUrl} alt="img-of-post"></img>
          </button>
          <div className="nav-post">
            { autorisation ?
              <button onClick={handleUpdatePost} className="button-update" ariaUpdatePost="button-update-post">
                <i class="far fa-edit"></i>
                Modifier
              </button>
              : null
            }
            <div className="show-comments">
              <button onClick={()=>setShowComment(!showComment)} ariaShowComment="button-show-comments" className='button-show-comment' type='button'>
                <i class="far fa-comment-dots"></i>
                Commentaire
              </button>
            </div>
            
            { autorisation ?
              <DeleteButton
                onDelete={() => {
                  axios.delete(URL_POSTS + `/${props.id}`).then((res) => {
                    alert('post supprimé')
                    window.location.reload();
                    console.log(res);
                  });
                }}
              />
              : null
            }
          </div>
          
        </div>
       
        {showComment && <GetAllComments 
          comments={props.comments}
          postId={props.id}
          />}
      </div>
    );
};

export default Post;