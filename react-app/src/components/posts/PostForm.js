import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { createNewPost } from "../../store/posts"
import '../posts/EditPostModal/EditPost.css'
import './PostForm.css'
import newPost from '../../Images/newPost.svg'


export default function PostForm({ setShowCreatePostModal }) {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [ addCaption, setAddCaption ] = useState(false)
    const [errors, setErrors] = useState([])

    const imageChange = (e) => setImageUrl(e.target.value)
    const descriptionChange = (e) => setDescription(e.target.value)

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            user_id: sessionUser.id,
            description,
            imageUrl
        }

        dispatch(createNewPost(payload))
        setShowCreatePostModal(false)
        history.push('/feed')
    }

    const imageHandler = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState == 2) {
                // console.log('READER RESULT', reader.result)
                setImageUrl(reader.result)
            }
        }
        // console.log('FILES', e.target.files)
        reader.readAsDataURL(e.target.files[0])
        setAddCaption(true)
    }

    const handleCancelPost = () => {
        setShowCreatePostModal(false)
    }

    if (!sessionUser) {
        return <Redirect to="/" />
    }

    return (
        <>
        {!addCaption &&
        <div className="edit-post-container-main" style={{ width: 500, height: 500 }}>
            <div className="edit-post-header-container">
                <div className="edit-post-cancel-button-container">
                    <button onClick={handleCancelPost} className="edit-post-cancel-button">Cancel</button>
                </div>
                <div style={{ marginRight: 50 }} className="edit-post-title-container">
                    Create a new post
                </div>
                <div>

                </div>
            </div>
            <div className="image-upload-container">
                <div className="image-upload-container-secondary">
                    <div className="image-svg-container">
                        <img src={newPost} alt='' />
                    </div>
                    <div className="image-upload-message">
                        Upload a photo
                    </div>
                    <label htmlFor="input" className='custom-file-upload'>
                        <input className="image-upload-input" type='file' name='image-upload' id='input' accept='image/*' onChange={imageHandler}/>
                        Select from computer
                    </label>
                </div>
            </div>
        </div>}

        {addCaption && <form onSubmit={onSubmit} className="edit-post-container-main">
            <div className="edit-post-header-container">
                <div className="edit-post-cancel-button-container">
                    <button onClick={handleCancelPost} className="edit-post-cancel-button">Cancel</button>
                </div>
                <div className="edit-post-title-container">
                    Create a new post
                </div>
                <div className="edit-post-submit-button-container">
                    <button className="edit-post-submit-button">Share</button>
                </div>
            </div>
            <div className="edit-post-container-secondary">
                <div className="edit-post-image-container">
                    <img className="edit-post-image" src={imageUrl} alt='' />
                </div>
                <div className="edit-post-form-container">
                    <div className="edit-post-username-container">
                        <div className="edit-post-username">{ sessionUser.username }</div>
                    </div>
                    <div >
                        <textarea cols='30' rows='15' required className="edit-post-input" type="text" value={description} onChange={descriptionChange} placeholder="Write your caption here..."></textarea>
                    </div>
                </div>
            </div>
        </form>}
        </>
    )
}
