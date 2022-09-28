import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { createNewPost } from "../../store/posts"
import '../posts/EditPostModal/EditPost.css'
import './PostForm.css'
import newPost from '../../Images/newPost.svg'
import ImageCrop from './ImageCrop'


export default function PostForm({ setShowCreatePostModal }) {
    const sessionUser = useSelector(state => state.session.user)
    const sessionAvatar = sessionUser.avatar
    const dispatch = useDispatch()
    const history = useHistory()

    const [imageUrl, setImageUrl] = useState('')
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState('')
    const [addCaption, setAddCaption] = useState(false)
    const [errors, setErrors] = useState([])
    // const [file, setFile] = useState(null)

    // store url from first attempt so I don't spam aws with new uploadevery time there's a
    // description validation
    const [tempUrl, setTempUrl] = useState('')

    const descriptionChange = (e) => setDescription(e.target.value)

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        let url
        if (!tempUrl) {
            const formData = new FormData()
            formData.append('image', image)
            const res = await fetch('/api/images', {
                method: 'POST',
                body: formData

            })

            if (res.ok) {
                const data = await res.json()
                setTempUrl(data.url)
                url = data.url
            } else {
                const error = await res.json()
                setErrors([error.error])
                return
            }
        }

        else if (tempUrl) url = tempUrl

        const payload = {
            user_id: sessionUser.id,
            description,
            imageUrl: url
        }

        const badData = await dispatch(createNewPost(payload))
        if (badData) {
            console.log(badData)
            setErrors(badData.map(err => [err.split(':')[1]]))
        } else {
            setShowCreatePostModal(false)
            history.push('/feed')
        }
    }

    const nextPage = () => {
        setErrors([])
        setAddCaption(true)
    }

    const handleCancelPost = () => {
        setErrors([])
        setImageUrl('')
        setTempUrl('')
        setAddCaption(false)
    }
    const handleCancelImageUpload = () => {
        setShowCreatePostModal(false)
    }

    function updateImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.addEventListener("load", () => {
            setImage(reader.result)
        })
        // setFile(file);
        // e.target.value = null
    }

    function dropHandler(e) {
        // stops browser from opening image in new tab
        e.preventDefault()
        if (e.dataTransfer.items) {
            const file = e.dataTransfer.items[0].getAsFile()

            setImage(file)
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

        let fileType
        if (image) {
            const firstPart = image.split(';')[0]
            fileType = firstPart.split(':')[1]
            console.log(fileType)
        }
        // whenever file  changes, check its type and throw error if it's not correct
        if (image && !allowedTypes.includes(fileType)) {
            setErrors(["Filetype must be jpg, jpeg, or png"])
        } else if (image && allowedTypes.includes(fileType)) {

            // create new img element
            let img = document.createElement('img')

            // if image doesn't render with the file, don't do anything and set
            // error to invalid image
            img.onerror = (err) => {
                setErrors(['Invalid image, please try again'])
            }

            // if image does load, set the preview to the file and go to caption modal
            img.onload = () => {
                setImageUrl(image)
                setAddCaption(true)
            }

            // add the file as image source
            img.src = image

        }

        // after checking image, remove active class
        if (dragOverArea) {
            dragOverArea.classList.remove("is-active")
        }
    }, [image])

    console.log(image)
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


            {addCaption &&

                <ImageCrop dataurl={imageUrl} />}



        </>
    )
}
