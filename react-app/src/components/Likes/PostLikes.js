import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import heartImage from '../../Images/svgexport-3.svg'
import filledInHeart from '../../Images/svgexport-2.svg'
import '../posts/post.css'
import { postLikeToggle } from "../../store/posts"

export default function PostLikes( { postId }) {
const dispatch = useDispatch()
const post = useSelector((state) => state.posts.normalizedPosts[postId])
const userId = useSelector((state) => state.session.user.id)

const [liked, setLiked] = useState(false)

useEffect(() => {
    if (post) {
        setLiked(post.userLikes.includes(userId))
    }
}, [post])

const handleClick = () => {
dispatch(postLikeToggle(postId, userId))
// IF NO ERRRORS DO BELOW
if (liked === false) {
    setLiked(true)
} else {
    setLiked(false)
    }
}

    return (
        <div className="post-likes-container" >
        <img className="post-like-button" onClick={handleClick} src={liked ? filledInHeart : heartImage } alt=''/>
        <p className="number-likes">{post.userLikes.length} likes</p>
        </div>
    )
}
