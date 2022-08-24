import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import heartImage from '../../Images/svgexport-3.svg'
import filledInHeart from '../../Images/svgexport-2.svg'
import '../posts/post.css'
import { postLikeToggle } from "../../store/posts"

export default function PostLikes( { postId }) {
const dispatch = useDispatch()
const post = useSelector((state) => Object.values(state.posts))
const userId = useSelector((state) => state.session.user.id)
const [liked, setLiked] = useState(false)

const handleClick = () => {
dispatch(postLikeToggle(postId, userId))
if (liked === false) {
    setLiked(true)
} else {
    setLiked(false)
    }
}

    return (
        <div className="post-likes-container" onClick={handleClick}>
        <img className="post-like-button" src={liked ? filledInHeart : heartImage } alt=''/>
        <p className="number-likes">{post.post_like} Likes</p>
        </div>
    )
}
