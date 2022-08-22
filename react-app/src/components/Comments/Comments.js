import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { postCommentThunk } from "../../store/comments"


export default function Comments({ postId }) {
    // const comments = useSelector(state => Object.values(state.comments))
    const comments = useSelector(state => state.posts.normalizedPosts[postId].comments)
    console.log('COMMENTS', comments)


    return (
        <div>
            {comments.length > 0 && comments.map(comment => (
                <div className="">

                </div>
            ))}
        </div>
    )


}
