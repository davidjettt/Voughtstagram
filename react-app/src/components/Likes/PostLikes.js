import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import heartImage from '../../Images/svgexport-3.svg'
import filledInHeart from '../../Images/svgexport-2.svg'
import '../posts/post.css'
import { postLikeToggle } from "../../store/posts"
import SinglePostModal from "../posts/SinglePostModal"

export default function PostLikes( { postId }) {
    const dispatch = useDispatch()
    const post = useSelector((state) => state.posts.normalizedPosts[postId])
    const userId = useSelector((state) => state.session.user.id)

    const [liked, setLiked] = useState(false)
    const [ commentIcon ] = useState(true)

    useEffect(() => {
        if (post) {
            setLiked(post.userLikes.includes(userId))
        }
    }, [post])

    const handleClick = () => {
    dispatch(postLikeToggle(postId, userId))
    }

    return (
        <>
            <div className="post-likes-container-main" >
                <div className="post-likes-container">
                    <img className="post-like-button" onClick={handleClick} src={liked ? filledInHeart : heartImage } alt=''/>
                </div>
                <SinglePostModal postIdCommentIcon={postId} commentIcon={commentIcon} />
            </div>
            <p className="number-likes">{post.userLikes.length} likes</p>
        </>
    )
}
