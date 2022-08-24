import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import {AiFillEdit} from 'react-icons/ai'
import CommentForm from './CommentForm';

export default function EditCommentModal({ comment }) {
    const [ showCommentModal, setShowCommentModal ] = useState(false)

    // const comments = useSelector(state => Object.values(state.comments))
    // const comment = comments.find(comment => +comment.id == +commentId)

    const handleClose = () => {
        setShowCommentModal(false)
    }

    const handleClick = () => {
        setShowCommentModal(true)
    }

    return (
        <>
            <button onClick={handleClick} className='edit-commit-button'><AiFillEdit /></button>
            {showCommentModal && <Modal onClose={handleClose}>
                <CommentForm setShowCommentModal={setShowCommentModal} formType='edit comment' commentToEdit={{...comment}} />
            </Modal>}
        </>
    )
}
