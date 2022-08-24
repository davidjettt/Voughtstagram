import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import {AiFillEdit} from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import CommentForm from './CommentForm';
import CommentOptions from './CommentOptions';
import './CommentOptions.css'

export default function CommentOptionsModal({ comment }) {
    const [ showCommentOptionsModal, setShowCommentOptionsModal ] = useState(false)

    // const comments = useSelector(state => Object.values(state.comments))
    // const comment = comments.find(comment => +comment.id == +commentId)

    const handleClose = () => {
        setShowCommentOptionsModal(false)
    }

    const handleClick = () => {
        setShowCommentOptionsModal(true)
    }

    return (
        <div>
            <button onClick={handleClick} className='comment-options-button'><BsThreeDots /></button>
            {showCommentOptionsModal && <Modal onClose={handleClose}>
                <CommentOptions setShowCommentOptionsModal={setShowCommentOptionsModal} formType='edit comment' commentToEdit={{...comment}} />
            </Modal>}
        </div>
    )
}
