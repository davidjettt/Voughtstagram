import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { editPost } from "../../../store/posts"
import './EditPost.css'

export default function EditForm({ postId, setShowPostOptionsModal }) {
    const sessionUser = useSelector(state => state.session.user)
    const post = useSelector(state => state.posts.normalizedPosts[Number(postId)])
    const dispatch = useDispatch()
    const history = useHistory()


    const [description, setDescription] = useState(post.description || '')
    const [errors, setErrors] = useState([])

    const descriptionChange = (e) => setDescription(e.target.value)

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            id: post.id,
            user_id: sessionUser.id,
            description,
            imageUrl: post.imageUrl
        }

        dispatch(editPost(payload))
        setShowPostOptionsModal(false)
        // history.push('/feed')
    }

    const handleCancelClick = () => {
        setShowPostOptionsModal(false)
    }


    if (!sessionUser) {
        return <Redirect to="/" />
    }

    return (
        <form onSubmit={onSubmit} className="edit-post-container-main">
            <div className="edit-post-header-container">
                <div className="edit-post-cancel-button-container">
                    <button onClick={handleCancelClick} className="edit-post-cancel-button">Cancel</button>
                </div>
                <div className="edit-post-title-container">
                    Edit Info
                </div>
                <div className="edit-post-submit-button-container">
                    <button className="edit-post-submit-button">Done</button>
                </div>
            </div>
            <div className="edit-post-container-secondary">
                <div className="edit-post-image-container">
                    <img className="edit-post-image" src={post.imageUrl} alt='' />
                </div>
                <div className="edit-post-form-container">
                    <div className="edit-post-username-container">
                        <div className="edit-post-username">{post.user.username}</div>
                    </div>
                    <div >
                        <textarea cols='30' rows='10' className="edit-post-input" required type="text" value={description} onChange={descriptionChange} placeholder="Caption"></textarea>
                        {/* <button type="submit">Submit</button> */}
                    </div>
                </div>
            </div>
        </form>
    )
}
