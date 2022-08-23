import CommentForm from "../Comments/CommentForm"
import Comments from "../Comments/Comments"

export default function Cards({post}) {

    return (
        <div className="post-card">
            <img src={post.imageUrl} alt=" "></img>
            <p>{post.description}</p>
            <Comments postId={post.id}/>
            <CommentForm postId={post.id} />
        </div>
    )
}
