import axios from 'axios';
import { URL_COMMENTS } from '../../config';
import React, { useEffect, useState } from 'react';
import DeleteComment from './DeleteComment';

const Comments = (props) => {
    const [autorisation, setAutorisation] = useState(false);
    const admin = localStorage.getItem('admin')
    const name = localStorage.getItem('name')
    const userName = props.user_name
    console.log("props.username",userName, admin);
  
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

    return (
        <div className='comments'>
            <div className="comments-of-post">
                <div className="user-of-comment-post">
                    Par {props.user_name}
                </div>
                <div className="response-of-comment-post">
                    {props.description}
                </div>
            </div>
            { autorisation ?
                <DeleteComment
                    onDelete={() => {
                        axios.delete(URL_COMMENTS + `/${props.id}`).then((res) => {
                            window.location.reload();
                            alert('commentaire supprimé')
                            console.log(res);
                        });
                    }}
                /> : null
            }
        </div>
    )
};

export default Comments;