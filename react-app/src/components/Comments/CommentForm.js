import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editCommentThunk, loadCommentsThunk, postCommentThunk } from "../../store/comments"
import './comment.css'


export default function CommentForm({ postId, commentToEdit, formType, setShowCommentModal, setShowCommentOptionsModal }) {
    const [ comment, setComment ] = useState(commentToEdit?.comment || '')
    const [ commentModal, setCommentModal ] = useState(false)
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [ errors, setErrors ] = useState([])

    useEffect(() => {
        if (formType === 'edit comment') setCommentModal(true)
    }, [])


    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        commentToEdit = {
            ...commentToEdit,
            comment: comment
        }

        if (formType === 'edit comment') {
            const badData = await dispatch(editCommentThunk(commentToEdit))
            if (badData) {
                setErrors(badData)
            }
            else {
                setShowCommentModal(false)
                setShowCommentOptionsModal(false)
                await dispatch(loadCommentsThunk())
            }
        } else {
            const payload = {
                user_id: sessionUser.id,
                post_id: postId,
                comment: comment
            }
            const badData =  await dispatch(postCommentThunk(payload))
            if (badData) {
                window.alert(badData)
            }
            setComment('')
        }
    }

    const handleCancel = () => {
        setShowCommentOptionsModal(false)
    }

    return (
        <form className={commentModal ? 'comment-modal-form' :"comment-form"} onSubmit={onSubmit}>
            {errors.length === 0 && commentModal && <div className="edit-comment-title">Edit Comment</div>}
            {errors.length > 0 && commentModal && <div style={{ color: 'red' }} className="edit-comment-title">{errors[0]}</div>}
            <input className={commentModal ? 'comment-modal-form-input' :"comment-form-input"} required type='text' placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} name='my-comment' />
            <button className={commentModal ? 'comment-modal-form-button' :"comment-form-button"}>Post</button>
            {commentModal && <button className="cancel-edit-comment-button" onClick={handleCancel}>Cancel</button>}
        </form>
    )
}
