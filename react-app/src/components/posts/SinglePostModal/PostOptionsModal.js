import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { BsThreeDots } from 'react-icons/bs'
import PostOptions from './PostOptions';


export default function PostOptionsModal({ postId }) {
    const [ showPostOptionsModal, setShowPostOptionsModal ] = useState(false)

    // const post = useSelector(state => state.posts.normalizedPosts[Number(postId)])

    const handleClose = () => {
        setShowPostOptionsModal(false)
    }
    const handleClick = () => {
        setShowPostOptionsModal(true)
    }

    return (
        <div>
            <button onClick={handleClick} className='post-options-button'><BsThreeDots className='three-dots' /></button>
            {showPostOptionsModal && <Modal onClose={handleClose}>
                <PostOptions setShowPostOptionsModal={setShowPostOptionsModal} formType='edit post' postId={postId} />
            </Modal>}
        </div>
    )
}
