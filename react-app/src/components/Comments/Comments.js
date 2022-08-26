import { useSelector } from 'react-redux'
import CommentOptionsModal from './CommentOptionsModal'
import './comment.css'
import { Link } from 'react-router-dom'


export default function Comments({ postId, allCommentsRender }) {
    const allComments = useSelector(state => state.comments)
    const currentUser = useSelector(state => state.session.user)
    const postComments = Object.values(allComments).filter(el => el.postId == postId)
    const users = useSelector(state => Object.values(state.users))
    // const commenterPicture = users[Object.values(allComments).userId - 1].avatar



    let commentsOnFeed;

    if (postComments.length === 1) {
        commentsOnFeed = [postComments[0]]
    } else {
        commentsOnFeed = [postComments[postComments.length - 2], postComments[postComments.length - 1]]
    }
    // const [isHovering, setIsHovering] = useState(false)
    // const handleMouseOver = () => {
    //     setIsHovering(true)
    // }

    // const handleMouseOut = () => {
    //     setIsHovering(false)
    // }

    return (
        <div>
            {!allCommentsRender && postComments.length > 0 && commentsOnFeed.map((comment, index )=> (
                <div key={comment.id} className="post-comment-container">
                    <p className='post-comment'>
                        <Link className='username-comment-link' to={`/users/${comment.userId}`}>
                            {comment.user.username}
                        </Link>
                        {comment.comment}
                    </p>
                    {currentUser.id === comment.userId &&
                    <CommentOptionsModal comment={comment} />
                    }
                </div>
            ))}
            {allCommentsRender && postComments.length > 0 && postComments.map((comment, index )=> (
                <div key={comment.id} className="post-comment-container">
                    <p className='post-comment'>
                        <Link className='username-comment-link' to={`/users/${comment.userId}`}>
                            <img className="single-post-profile-image" src={users[(comment).userId - 1].avatar}></img>
                            {comment.user.username}
                        </Link>
                        {comment.comment}
                    </p>
                    {currentUser.id === comment.userId &&
                    <CommentOptionsModal comment={comment} />
                    }
                </div>
            ))}
        </div>
    )
}
