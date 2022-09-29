import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { createNewPost } from "../../store/posts"
import '../posts/EditPostModal/EditPost.css'
import './PostForm.css'
import newPost from '../../Images/newPost.svg'
import React from "react";
// import "./imagecrop.css";
import { nanoid } from "nanoid";
import backArrow from '../../Images/instagrambackarrow.svg'
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";
import { dataURLtoFile } from "../utils/dataUrlToFile";


export default function PostForm({ setShowCreatePostModal }) {
    const sessionUser = useSelector(state => state.session.user)
    const sessionAvatar = sessionUser.avatar
    const dispatch = useDispatch()
    const history = useHistory()

    const [zoom, setZoom] = useState(1) // for cropping
    const [imageUrl, setImageUrl] = useState('') // for the post
    const [image, setImage] = useState(null) // for the file from computer, and for cropper
    const [fileForUpload, setFileForUpload] = useState(null) // for after cropping and clicking confirm
    const [description, setDescription] = useState('') // for the post
    const [stage, setStage] = useState('image') // which stage of the post are we on
    const [errors, setErrors] = useState([]) // for image validation and post validation
    const [uploading, setUploading] = useState(false) // for aws upload


    // cropping stuff
    const [croppedArea, setCroppedArea] = React.useState(null);
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    const submitCrop = async () => {
        const canvas = await getCroppedImg(image, croppedArea)
        const canvasDataUrl = canvas.toDataURL('image/jpeg')
        const converted = dataURLtoFile(canvasDataUrl, `${nanoid()}.jpeg`)

        const formData = new FormData()
        formData.append('image', converted)
        setUploading(true)
        const res = await fetch('/api/images', {
            method: 'POST',
            body: formData

        })

        if (res.ok) {
            setUploading(false)
            const data = await res.json()
            setImageUrl(data.url)
            setStage("addCaption")
        } else {
            setUploading(false)
            window.alert("Something went wrong. Please try again.")
            return
        }
    }

    // store url from first attempt so I don't spam aws with new uploadevery time there's a
    // description validation
    const [tempUrl, setTempUrl] = useState('')

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
            console.log(badData)
            setErrors(badData.map(err => [err.split(':')[1]]))
        } else {
            setShowCreatePostModal(false)
            history.push('/feed')
        }
    }

    const handleCancelImageUpload = () => {
        if (stage === "crop") {
            setStage("image")
            setErrors([])
            setImage(null)
        }

        else if (stage === "image") {
            setShowCreatePostModal(false)
        }

        else if (stage === "addCaption") {
            setErrors([])
            setStage("crop")
        }
    }

    function updateImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.addEventListener("load", () => {
            setImage(reader.result)
        })
    }

    function dropHandler(e) {
        // stops browser from opening image in new tab
        e.preventDefault()
        if (e.dataTransfer.items) {
            const reader = new FileReader()
            const file = e.dataTransfer.items[0].getAsFile()
            reader.readAsDataURL(file)

            reader.addEventListener("load", () => {
                setImage(reader.result)
            })
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

        console.log(image)
        let fileType
        if (image) {
            const firstPart = image.split(';')[0]
            fileType = firstPart.split(':')[1]
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
                setStage("crop")
            }

            // add the file as image source
            img.src = image

        }

        // after checking image, remove active class
        if (dragOverArea) {
            dragOverArea.classList.remove("is-active")
        }
    }, [image])

    if (!sessionUser) {
        return <Redirect to="/" />
    }

    return (
        <>
            {stage === "image" &&

                <div className="edit-post-container-main" style={{ maxWidth: '40vw', minWidth: '600px', minHeight: '600px', maxHeight: '100vh' }}>
                    <div className="edit-post-header-container" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ paddingTop: 3 }} className="edit-post-title-container">
                            Create new post
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

            {stage === "crop" &&
                <div className="edit-post-container-main" style={{ maxWidth: '95vw', minWidth: '800px', minHeight: 'auto', maxHeight: '95vh' }}>
                    <div style={{ height: '42px' }} className="edit-post-header-container">
                        <div className="edit-post-cancel-button-container">
                            <button onClick={handleCancelImageUpload} className="edit-post-cancel-button"><img style={{ width: '24px', height: '24px' }} src={backArrow}></img></button>
                        </div>
                        <div style={{ paddingTop: 3 }} className="edit-post-title-container">
                            Crop
                        </div>
                        <div>
                            <button style={{ fontSize: 14 }} disabled={uploading === true} className="edit-post-submit-button" onClick={submitCrop}>Upload</button>
                        </div>
                    </div>
                    <div style={{ height: '100%', width: '100%' }} className='container'>
                        <div style={{ height: '90%', padding: '10px' }} className='container-cropper'>
                            {image ? (
                                <>
                                    <div className='cropper' style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                                        <Cropper
                                            image={image}
                                            // cropSize={{ width: 600, height: 600 }}
                                            objectFit={"vertical-cover"}
                                            crop={crop}
                                            zoom={zoom}
                                            onZoomChange={setZoom}
                                            aspect={1}
                                            onCropChange={setCrop}
                                            onCropComplete={onCropComplete}
                                        />
                                    </div>

                                </>
                            ) : null}
                        </div>
                    </div>
                </div>}

            {stage === "addCaption" &&
                <>
                    <form onSubmit={onSubmit} className="edit-post-container-main" >
                        <div className="edit-post-header-container">
                            <div className="edit-post-cancel-button-container">
                                <button onClick={handleCancelImageUpload} className="edit-post-cancel-button"><img style={{ height: '24px', width: '24px' }} src={backArrow}></img></button>
                            </div>
                            <div className="edit-post-title-container">
                                Create New Post
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
                                    <textarea cols='30' rows='15' className="edit-post-input" type="text" value={description} onChange={descriptionChange} placeholder="Write a caption..."></textarea>
                                </div>
                                <div className='errors'>
                                    {errors.map((error, ind) => (
                                        <div key={ind}>{error}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </form>
                </>
            }


        </>
    )
}
