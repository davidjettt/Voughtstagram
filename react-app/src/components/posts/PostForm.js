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
    const [addCaption, setAddCaption] = useState(false)
    const [errors, setErrors] = useState([])

    const imageChange = (e) => setImageUrl(e.target.value)
    const descriptionChange = (e) => setDescription(e.target.value)

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const payload = {
            user_id: sessionUser.id,
            description,
            imageUrl
        }

        const badData = await dispatch(createNewPost(payload))
        if (badData) {
            setErrors(badData)
        } else {
            setShowCreatePostModal(false)
            history.push('/feed')
        }
    }

    const imageHandler = (e) => {
        setImageUrl(e.target.value)
    }

    const isValidURL = (urlString) => {
        try {
            return Boolean(new URL(urlString))
        } catch (e) {
            return false
        }
    }

    const nextPage = () => {
        setErrors([])
        if (isValidURL(imageUrl)) {
            setAddCaption(true)
        } else {
            setErrors(['Invalid image url'])
        }
    }

    const handleCancelPost = () => {
        setErrors([])
        setAddCaption(false)
    }
    const handleCancelImageUpload = () => {
        setShowCreatePostModal(false)
    }

    if (!sessionUser) {
        return <Redirect to="/" />
    }

    return (
        <>
            {!addCaption &&

                <div className="edit-post-container-main" style={{ width: 600, height: 600 }}>
                    <div className="edit-post-header-container">
                        <div className="edit-post-cancel-button-container">
                            <button onClick={handleCancelImageUpload} className="edit-post-cancel-button">Cancel</button>
                        </div>
                        <div style={{ paddingTop: 3 }} className="edit-post-title-container">
                            Create a new post
                        </div>
                        <div>
                            <button className="edit-post-submit-button" onClick={nextPage}>Next</button>
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
                            <input required value={imageUrl} onChange={imageHandler} type='url' placeholder="Image Url" />
                            <div className='errors'>
                                {errors.map((error, ind) => (
                                    <div key={ind}>{error}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>}

            {addCaption && <form onSubmit={onSubmit} className="edit-post-container-main" >
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
                            <div className="edit-post-username">{sessionUser.username}</div>
                        </div>
                        <div >
                            <textarea cols='30' rows='15' required className="edit-post-input" type="text" value={description} onChange={descriptionChange} placeholder="Write your caption here..."></textarea>
                        </div>
                        <div className='errors'>
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>}
        </>
    )
}
