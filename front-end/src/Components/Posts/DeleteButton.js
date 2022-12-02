import React from 'react';

// Fonction qui permet la suppréssion d'un post ( visible que par le propriétaire du post ou un admin )
const DeleteButton = (props) => {
    return (
        <button onClick={()=>{
            props.onDelete()
        }} className='delete-button' ariaDelete="button-delete">    
            <i class="fas fa-trash-alt"></i>
            Supprimer
        </button>
    );
};


export default DeleteButton;