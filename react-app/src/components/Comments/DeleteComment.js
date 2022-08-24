import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCommentThunk } from "../../store/comments";

export default function DeleteComment({ comment }) {
    const dispatch = useDispatch();
    const handleDeleteComment = async () => {
        await dispatch(deleteCommentThunk(comment));
    }

    // const [isHovering, setIsHovering] = useState(false)
    // const handleMouseOver = () => {
    //     setIsHovering(true)
    // }

    // const handleMouseOut = () => {
    //     setIsHovering(false)
    // }

    return (
            <button className="delete-comment-button" onClick={handleDeleteComment}>Delete Comment</button>
    )
}
