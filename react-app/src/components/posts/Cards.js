import CommentForm from "../Comments/CommentForm"
import Comments from "../Comments/Comments"
import PostLikes from "../Likes/PostLikes"
import SinglePostModal from "./SinglePostModal"
import './post.css'

export default function Cards({post}) {

    return (
        <div className="post-card">
            <div className="post-card-user">{post.user.username}</div>
            <img src={post.imageUrl} alt=" "></img>
            <PostLikes postId={post.id}/>
            <div className="post-card-description">
                <div className="post-card-description-user">{post.user.username}</div>
                <div >{post.description}</div>
            </div>
            <SinglePostModal postId={post.id}/>
            <Comments postId={post.id}/>
            <div className="post-card-submit-comment">
                <CommentForm postId={post.id} />
            </div>
        </div>
    )
}
