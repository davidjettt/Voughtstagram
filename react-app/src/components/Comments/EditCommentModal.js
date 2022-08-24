import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import {AiFillEdit} from 'react-icons/ai'
import CommentForm from './CommentForm';

export default function EditCommentModal({ comment }) {
    const [ showModal, setShowModal ] = useState(false)

    // const comments = useSelector(state => Object.values(state.comments))
    // const comment = comments.find(comment => +comment.id == +commentId)

    const handleClose = () => {
        setShowModal(false)
    }

    const handleClick = () => {
        setShowModal(true)
    }

    return (
        <>
            <button onClick={handleClick} className='edit-commit-button'><AiFillEdit /></button>
            {showModal && <Modal onClose={handleClose}>
                <CommentForm setShowModal={setShowModal} formType='edit comment' commentToEdit={{...comment}} />
            </Modal>}
        </>
    )
}
