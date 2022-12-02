import React from 'react';

// Fonction qui permet la suppréssion d'un post ( visible que par le propriétaire du post ou un admin )
const DeleteComment = (props) => {
    return (
        <button onClick={()=>{
            props.onDelete()
        }} className='delete-button' ariaDelete="button-delete">    
            <i class="fas fa-trash-alt"></i>
            Supprimer le commentaire
        </button>
    );
};


export default DeleteComment;