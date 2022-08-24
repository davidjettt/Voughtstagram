import { useState } from 'react';
import { Modal } from '../../context/Modal';
import CommentForm from './CommentForm';
import DeleteComment from './DeleteComment';



export default function CommentOptions({ commentToEdit, setShowCommentOptionsModal }) {
    const [ showCommentModal, setShowCommentModal ] = useState(false)

    // const comments = useSelector(state => Object.values(state.comments))
    // const comment = comments.find(comment => +comment.id == +commentId)

    // const handleClose = () => {
    //     setShowCommentModal(false)
    // }

    const handleCommentOptionsModal = () => {
        setShowCommentOptionsModal(false)
    }

    const handleClick = () => {
        setShowCommentModal(true)
    }

    return (
        <div className='comment-options-container'>
            <div className='comment-modal-buttons-container'>
                {!showCommentModal && <button className='edit-comment-button' onClick={handleClick}>Edit Comment</button>}
                {showCommentModal &&
                    <CommentForm setShowCommentOptionsModal={setShowCommentOptionsModal} setShowCommentModal={setShowCommentModal} formType='edit comment' commentToEdit={{...commentToEdit}} />
                }
                {!showCommentModal && <DeleteComment comment={commentToEdit} />}
                {!showCommentModal && <button className='cancel-button' onClick={handleCommentOptionsModal}>Cancel</button>}
            </div>
        </div>
    )
}
