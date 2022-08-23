import { useSelector } from 'react-redux'

export default function Comments({ postId }) {

    const allComments = useSelector(state => state.comments)
    const postComments = Object.values(allComments).filter(el => el.postId == postId)

    return (
        <div>
            {postComments.length > 0 && postComments.map(comment => (
                <div key={comment.id} className="">
                    <p>{comment.user.username}: {comment.comment}</p>
                </div>
            ))}
        </div>
    )
}
