import CommentForm from "../Comments/CommentForm"
import Comments from "../Comments/Comments"
import PostLikes from "../Likes/PostLikes"
import { NavLink } from "react-router-dom"
import SinglePostModal from "./SinglePostModal"

export default function Cards({post}) {

    return (
        <div className="post-card">
            <NavLink to={`/feed/${post.id}`} >
                <img src={post.imageUrl} alt=" "></img>
            </NavLink>
            <PostLikes postId={post.id}/>
            <p>{post.description}</p>
            <SinglePostModal />
            <Comments postId={post.id}/>
            <CommentForm postId={post.id} />
        </div>
    )
}
