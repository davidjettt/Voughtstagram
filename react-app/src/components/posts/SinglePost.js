import { useParams, Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import './post.css'
import { removePost } from "../../store/posts"


export default function SinglePost() {
    const { postId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const post = useSelector(state => state.posts.normalizedPosts[Number(postId)])
    const handleDelete = () => {
        dispatch(removePost(postId))
        history.push('/feed')
    }
    if (!post) {
        return null
    }
    return (
        <div>
            <img src={post.imageUrl} alt=''></img>
            <p>{post.description}</p>
            <p>user: {post.user.username}</p>

            {sessionUser?.id == post.userId && <>
                <Link to={`/feed/${post.id}/edit`}>
                    <button>Edit</button>
                </Link>
                <button onClick={handleDelete}>Delete</button>
            </>
            }
        </div>

    )
}