import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import PostForm from '../PostForm';
import newPost from '../../../Images/createpost.svg'


export default function CreatePostModal() {
    const [ showCreatePostModal, setShowCreatePostModal ] = useState(false)

    const handleClose = () => {
        setShowCreatePostModal(false)
    }
    const handleClick = () => {
        setShowCreatePostModal(true)
    }

    return (
        <div>
            <img onClick={handleClick} className='new-post-button' src={newPost}/>
            {showCreatePostModal && <Modal onClose={handleClose}>
                <PostForm setShowCreatePostModal={setShowCreatePostModal} />
            </Modal>}
        </div>
    )
}
