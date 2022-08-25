import { Redirect, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import '../post.css'
import Comments from "../../Comments/Comments"
import PostLikes from "../../Likes/PostLikes"
import CommentForm from "../../Comments/CommentForm"
import PostOptionsModal from "./PostOptionsModal"


export default function SinglePost({postId}) {
    const sessionUser = useSelector(state => state.session.user)
    const post = useSelector(state => state.posts.normalizedPosts[Number(postId)])

    if (!post) {
        return <Redirect to="/feed"/>
    }

    return (
        <div className="single-post-container">
            <div className="single-post-left">
                <div className="single-post-image-container">
                    <img className="single-post-image" src={post.imageUrl} alt=''></img>
                </div>

            </div>
            <div className="single-post-text">
                <div className="single-post-header">

                    <NavLink className="profile-link" to={`/users/${post.userId}`}>
                        {post.user.username}
                    </NavLink>
                    {sessionUser?.id === post.userId &&
                        <PostOptionsModal postId={postId} />
                    }


                </div>
                <div>
                    <div className="single-post-description">
                        <NavLink className="profile-link" to={`/users/${post.userId}`}>
                            <p className="single-post-description-user">{post.user.username}</p>
                        </NavLink>
                        <p>{post.description}</p>
                    </div>
                    <div className="single-post-comments">
                        <Comments postId={postId}/>
                    </div>
                    <div className="single-post-footer">
                        <div className="single-post-likes">
                            <PostLikes postId={post.id}/>
                        </div>
                        <div className="post-card-submit-comment">
                            <CommentForm postId={post.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
