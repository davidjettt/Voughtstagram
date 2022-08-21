import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

export default function NewPostForm() {
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
            userId: sessionUser.id,
            description,
            imageUrl
        }

        console.log(payload)

        await dispatch(
            // thunk for creating post here
        )
    }

    useEffect(() => {
        // form error handling here
    },[])


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
