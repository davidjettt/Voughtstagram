import CommentForm from "../Comments/CommentForm"
import Comments from "../Comments/Comments"
import PostLikes from "../Likes/PostLikes"
import SinglePostModal from "./SinglePostModal"
import './post.css'
import { NavLink } from "react-router-dom"

export default function Cards({post}) {

    return (
        <div className="post-card">
            <NavLink className="profile-link" to={`/users/${post.userId}`}>
                <div className="post-card-user">{post.user.username}</div>
            </NavLink>
            <img className="post-card-image" src={post.imageUrl} alt=" "></img>
            <PostLikes postId={post.id}/>
            <div className="post-card-description">
                <NavLink className="profile-link" to={`/users/${post.userId}`}>
                    <div className="post-card-description-user">{post.user.username}</div>
                </NavLink>
                <div >{post.description}</div>
            </div>
            <SinglePostModal postId={post.id}/>
            <div>
                <Comments postId={post.id}/>
            </div>
            <div className="post-card-submit-comment">
                <CommentForm postId={post.id} />
            </div>
        </div>
    )
}
