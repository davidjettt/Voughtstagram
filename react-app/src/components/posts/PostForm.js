import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { createNewPost } from "../../store/posts"
import '../posts/EditPostModal/EditPost.css'
import './PostForm.css'
import newPost from '../../Images/newPost.svg'


export default function PostForm({ setShowCreatePostModal }) {
    const sessionUser = useSelector(state => state.session.user)
    const sessionAvatar = sessionUser.avatar
    const dispatch = useDispatch()
    const history = useHistory()

    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [addCaption, setAddCaption] = useState(false)
    const [errors, setErrors] = useState([])
    const [file, setFile] = useState(null)

    // const imageChange = (e) => setImageUrl(e.target.value)
    const descriptionChange = (e) => setDescription(e.target.value)

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        let url
        const formData = new FormData()
        formData.append('image', file)
        const res = await fetch('/api/images', {
            method: 'POST',
            body: formData

        })

        if (res.ok) {
            const data = await res.json()
            url = data.url
        } else {
            const error = await res.json()
            setErrors([error.error])
            return
        }

        const payload = {
            user_id: sessionUser.id,
            description,
            imageUrl: url
        }

        const badData = await dispatch(createNewPost(payload))
        if (badData) {
            setErrors(badData)
        } else {
            setShowCreatePostModal(false)
            history.push('/feed')
        }
    }

    // const imageHandler = (e) => {
    //     setImageUrl(e.target.value)
    // }

    // const isValidURL = (urlString) => {
    //     try {
    //         return Boolean(new URL(urlString))
    //     } catch (e) {
    //         return false
    //     }
    // }

    const nextPage = () => {
        setErrors([])
        setAddCaption(true)
        // if (isValidURL(imageUrl)) {
        //     setAddCaption(true)
        // } else {
        //     setErrors(['Invalid url'])
        // }
    }

    const handleCancelPost = () => {
        setErrors([])
        setImageUrl('')
        setAddCaption(false)
    }
    const handleCancelImageUpload = () => {
        setShowCreatePostModal(false)
    }

    function updateImage(e) {
        const file = e.target.files[0];
        setFile(file);
        e.target.value = null
    }

    function dropHandler(e) {
        // stops browser from opening image in new tab
        e.preventDefault()
        if (e.dataTransfer.items) {
            const file = e.dataTransfer.items[0].getAsFile()
            setFile(file)
        }
    }

    function dragOverHandler(e) {
        // stops browser from opening image in new tab
        e.preventDefault()
        const dragOverArea = document.getElementById("drop-zone")
        if (dragOverArea) {
            dragOverArea.classList.add("is-active")
        }
    }

    function dragLeaveHandler(e) {
        // e.preventDefault()
        const dragOverArea = document.getElementById("drop-zone")
        if (dragOverArea) {
            dragOverArea.classList.remove("is-active")
        }
    }

    const handleFileClick = (e) => {
        const fileInput = document.getElementById("file-upload")
        fileInput.click()
    }


    useEffect(() => {
        setErrors([])
        const allowedTypes = ["image/jpg", "image/jpeg", "image/png"]
        const dragOverArea = document.getElementById("drop-zone")

        // whenever file  changes, check its type and throw error if it's not correct
        if (file && !allowedTypes.includes(file.type)) {
            setErrors(["Filetype must be jpg, jpeg, or png"])
        } else if (file && allowedTypes.includes(file.type)) {

            // create new img element
            let img = document.createElement('img')

            // if image doesn't render with the file, don't do anything and set
            // error to invalid image
            img.onerror = (err) => {
                setErrors(['Invalid image, please try again'])
            }

            // if image does load, set the preview to the file and go to caption modal
            img.onload = () => {
                setImageUrl(URL.createObjectURL(file))
                setAddCaption(true)
            }

            // add the file as image source
            img.src = URL.createObjectURL(file)

        }

        // after checking image, remove active class
        if (dragOverArea) {
            dragOverArea.classList.remove("is-active")
        }
    }, [file])


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
                            <button style={{ fontSize: 14 }} className="edit-post-submit-button" disabled={imageUrl === ''} onClick={nextPage}>Next</button>
                        </div>
                    </div>
                    <div id="drop-zone" onDragLeave={dragLeaveHandler} onDragOver={dragOverHandler} onDrop={dropHandler} className="image-upload-container">
                        <div className="image-upload-container-secondary">
                            <div className="image-svg-container">
                                <img src={newPost} alt='' />
                            </div>
                            <div className="image-upload-message">
                                Drag photo from computer here
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>

                                <button id="file-select" onClick={handleFileClick} className="upload-image-button">
                                    Select from computer
                                </button>
                            </div>
                            <input
                                id="file-upload"
                                type="file"
                                accept=".png,
                                        .jpeg,
                                        .jpg,
                                        .gif,"
                                onChange={updateImage}
                                style={{ display: 'none' }}
                            />
                            <div className='errors'>
                                {errors.map((error, ind) => (
                                    <div key={ind}>{error}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>}

            {
                addCaption && <form onSubmit={onSubmit} className="edit-post-container-main" >
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
                                <div className="post-form-avatar-container">
                                    <img className="single-post-profile-image" src={sessionAvatar || 'https://nitreo.com/img/igDefaultProfilePic.png'} alt='' />
                                </div>
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
                </form>
            }
        </>
    )
}
