import Post from '../Posts/Post';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { URL_POSTS } from '../../config';
import NavBar from '../../NavBar/NavBar';
import { useNavigate } from 'react-router-dom'



const GetAllPost = (props) => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])

    // Fonction permettant l'affichage de tout les posts disponible dans la base de données des posts
    useEffect( () => {
        axios.get(URL_POSTS)
        .then( res => {
            const allPosts = res.data
            setPosts(allPosts)
            console.log("props.admin",posts);
        })
    }, []);
    // Fonction permettant d'aller à la page de création de post
    const handleSubmit = () => {
        navigate('/createpost')
    }


    return (
        
        <div>  
            <NavBar/>   
            <br/>
            <div >
                <button className='button-create-post' onClick={handleSubmit} ariaCreatePost="button-create-post">
                    <div className='div-create'>
                        <i class="fas fa-plus-circle"></i>
                        Créer un post
                    </div>
                </button>
                <div className='posts'>
                    { posts.map( (post) => <Post 
                        key={post.id}
                        description={post.description}
                        user_name ={post.User?.user_name}
                        createdAt= {post.createdAt}
                        imageUrl= {post.imageUrl}
                        title={post.title} 
                        id= {post.id} 
                        comments= {post.Comments}
                        admin= {props.admin}
                    />)}
                </div>
            </div>
        </div>
        
    )
};

export default GetAllPost;