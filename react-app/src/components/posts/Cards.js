import CommentForm from "../Comments/CommentForm"
import Comments from "../Comments/Comments"
import PostLikes from "../Likes/PostLikes"
import SinglePostModal from "./SinglePostModal"

export default function Cards({post}) {

    return (
        <div className="post-card">
            <img src={post.imageUrl} alt=" "></img>
            <PostLikes postId={post.id}/>
            <p>{post.description}</p>
            <SinglePostModal postId={post.id}/>
            <Comments postId={post.id}/>
            <CommentForm postId={post.id} />
        </div>
    )
}
