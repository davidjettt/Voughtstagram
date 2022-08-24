import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { editPost } from "../../../store/posts"

export default function EditForm({postId}) {
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
        history.push('/feed')
    }


    if (!sessionUser) {
        return <Redirect to="/" />
    }

    return (
        <form onSubmit={onSubmit}>
            <input required type="text" value={description} onChange={descriptionChange} placeholder="Caption"></input>
            <button type="submit">Submit</button>
        </form>
    )
}
