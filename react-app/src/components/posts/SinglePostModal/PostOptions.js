import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { removePost } from "../../../store/posts"
import EditPostModal from "../EditPostModal"
import EditForm from "../EditPostModal/EditPost"
import '../EditPostModal/EditPost.css'

export default function PostOptions({ postId, setShowPostOptionsModal }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [ showPostModal, setShowPostModal ] = useState(false)
    const [ postModal, setPostModal ] = useState(false)

    const handlePostOptionsModal = () => {
        setShowPostOptionsModal(false)
    }

    const handleClick = () => {
        setShowPostModal(true)
        setPostModal(true)
    }

    const handlePostDelete = () => {
        dispatch(removePost(postId))
        history.push('/feed')
    }

    return (
        <div className={postModal ? 'post-options-container-bigger' : 'post-options-container'}>
            <div className='post-modal-buttons-container'>
                {!showPostModal && <button className='edit-post-button' onClick={handleClick}>Edit Post</button>}
                {showPostModal &&
                    <EditForm setShowPostOptionsModal={setShowPostOptionsModal} setShowPostModal={setShowPostModal} formType='edit post' postId={postId} />
                }
                {!showPostModal && <button className="delete-post-button" onClick={handlePostDelete}>Delete Post</button>}
                {!showPostModal && <button className='cancel-button' onClick={handlePostOptionsModal}>Cancel</button>}
            </div>
    </div>
    )
}
