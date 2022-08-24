import { useState } from 'react'
import { useSelector } from 'react-redux'
import DeleteComment from './DeleteComment'
import {AiFillEdit} from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import EditCommentModal from './EditCommentModal'
import CommentOptionsModal from './CommentOptionsModal'


export default function Comments({ postId }) {
    const allComments = useSelector(state => state.comments)
    const currentUser = useSelector(state => state.session.user)
    const postComments = Object.values(allComments).filter(el => el.postId == postId)

    // const [isHovering, setIsHovering] = useState(false)
    // const handleMouseOver = () => {
    //     setIsHovering(true)
    // }

    // const handleMouseOut = () => {
    //     setIsHovering(false)
    // }


    return (
        <div>
            {postComments.length > 0 && postComments.map((comment, index )=> (
                <div key={comment.id} className="">
                    <p>{comment.user.username}: {comment.comment}</p>
                    {currentUser.id === comment.userId &&
                    <CommentOptionsModal comment={comment} />
                    }
                    {/* {currentUser.id === comment.userId &&
                    < DeleteComment comment={comment} index={index} />
                    } */}
                </div>
            ))}
        </div>
    )
}
