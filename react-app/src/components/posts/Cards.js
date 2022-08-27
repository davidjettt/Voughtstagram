import CommentForm from "../Comments/CommentForm"
import Comments from "../Comments/Comments"
import PostLikes from "../Likes/PostLikes"
import SinglePostModal from "./SinglePostModal"
import './post.css'
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import PostOptionsModal from "./SinglePostModal/PostOptionsModal"

export default function Cards({post}) {
    const sessionUser = useSelector(state => state.session.user)
    const fromCards = true
    const users = useSelector(state => Object.values(state.users))
    const posterPicture = users[post.userId - 1].avatar
    return (
        <div className="post-card">
            <div className="post-card-header">
                <div className='post-card-avatar'>
                <img className="single-post-profile-image" src={posterPicture || 'https://nitreo.com/img/igDefaultProfilePic.png'}/>
                <NavLink className="profile-link" to={`/users/${post.userId}`}>
                    <div className="post-card-user">{post.user.username}</div>
                </NavLink>
                </div>
                {sessionUser?.id === post.userId &&
                    <PostOptionsModal postId={post.id} />
                }
            </div>
            <img className="post-card-image" src={post.imageUrl} alt=" "></img>
            <PostLikes postId={post.id} fromCards={fromCards}/>
            <div className="post-card-description">
                <NavLink className="profile-link" to={`/users/${post.userId}`}>
                    <div className="post-card-description-user">{post.user.username}</div>
                </NavLink>
                <div >{post.description}</div>
            </div>
            <SinglePostModal postId={post.id}/>
            <div className="post-card-comments">
                <Comments postId={post.id}/>
            </div>
            <div className="post-card-submit-comment">
                <CommentForm postId={post.id} />
            </div>
        </div>
    )
}
