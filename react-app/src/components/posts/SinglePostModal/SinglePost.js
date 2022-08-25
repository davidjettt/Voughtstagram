import { useHistory, Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import '../post.css'
import { removePost } from "../../../store/posts"
import EditPostModal from "../EditPostModal"
import Comments from "../../Comments/Comments"
import PostLikes from "../../Likes/PostLikes"
import CommentForm from "../../Comments/CommentForm"
import PostOptionsModal from "./PostOptionsModal"


export default function SinglePost({postId}) {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const post = useSelector(state => state.posts.normalizedPosts[Number(postId)])

    // const handleDelete = () => {
    //     dispatch(removePost(postId))
    //     history.push('/feed')
    // }
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
                    <div>{post.user.username}</div>
                    {sessionUser?.id === post.userId &&
                        <PostOptionsModal postId={postId} />
                    }
                </div>
                <div className="single-post-description">
                    <p className="single-post-description-user">{post.user.username}</p>
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
                {/* {sessionUser?.id === post.userId && <>
                    <EditPostModal postId={postId}/>
                    <button onClick={handleDelete}>Delete</button>
                </>
                } */}
            </div>
        </div>

    )
}
