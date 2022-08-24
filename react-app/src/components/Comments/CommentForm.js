import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editCommentThunk, loadCommentsThunk, postCommentThunk } from "../../store/comments"

export default function CommentForm({ postId, commentToEdit, formType, setShowModal }) {
    const [ comment, setComment ] = useState(commentToEdit?.comment || '')
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault()

        commentToEdit = {
            ...commentToEdit,
            comment: comment
        }

        if (formType === 'edit comment') {
            await dispatch(editCommentThunk(commentToEdit))
            setShowModal(false)
            await dispatch(loadCommentsThunk())
        } else {
            const payload = {
                user_id: sessionUser.id,
                post_id: postId,
                comment: comment
            }
            await dispatch(postCommentThunk(payload))
            setComment('')
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input required type='text' value={comment} onChange={(e) => setComment(e.target.value)} />
            <button>Post</button>
        </form>
    )
}
