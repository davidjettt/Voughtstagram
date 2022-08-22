import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createNewPost } from "../../store/posts"


// should eventually be a modal
// can also be used for edit form by using props

export default function PostForm() {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])

    const imageChange = (e) => setImageUrl(e.target.value)
    const descriptionChange = (e) => setDescription(e.target.value)

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            user_id: sessionUser.id,
            description,
            image_url: imageUrl
        }

        dispatch(createNewPost(payload))

    }

    useEffect(() => {
        // form error handling here
    },[imageUrl, description])


    if (!sessionUser) {
        return <Redirect to="/" />
    }

    return (
        <form onSubmit={onSubmit}>
            <input required type="url" value={imageUrl} onChange={imageChange} placeholder="Image URL"></input><br></br>
            <input required type="text" value={description} onChange={descriptionChange} placeholder="Caption"></input>
            <button type="submit">Submit</button>
        </form>
    )
}
