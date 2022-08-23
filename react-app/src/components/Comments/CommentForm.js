import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { postCommentThunk } from "../../store/comments"
import './comment.css'

export default function CommentForm({ postId }) {
    const [ comment, setComment ] = useState('')
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        const payload = {
            user_id: sessionUser.id,
            post_id: postId,
            comment: comment
        }
        dispatch(postCommentThunk(payload))
        setComment('')
    }

    return (
        <form className="comment-form" onSubmit={onSubmit}>
            <input className="comment-form-input" required type='text' placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
            <button className="comment-form-button">Post</button>
        </form>
    )
}
