const LOAD_COMMENTS = '/comments/all'
const POST_COMMENT = '/comments/post'
const EDIT_COMMENT = '/comments/edit'
const DELETE_COMMENT = '/comments/delete'

const loadComments = (comments) => {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}

const postComment = (comment) => {
    return {
        type: POST_COMMENT,
        comment
    }
}

const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

export const loadCommentsThunk = () => async (dispatch) => {
    const response = await fetch('/api/comments')

    if (response.ok) {
        const data = await response.json()
        dispatch(loadComments(data))
    }
}

export const postCommentThunk = (comment) => async (dispatch) => {
    const response = await fetch(`/posts/${comment.postId}/comments`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(postComment(data))
    }
}

export const editCommentThunk = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(editComment(data))
    }
}

export const deleteCommentThunk = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
    })
    if (response.ok) {
        dispatch(deleteComment(comment))
    }
}

const initialState = {}
export default function commentsReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_COMMENTS: {
            let newState = {...state}
            action.comments.allComments.forEach(comment => {
                newState[comment.id] = comment
            })
            return newState
        }
        case POST_COMMENT: {
            let newState = {...state}
            newState[action.comment.id] = action.comment
            return newState
        }
        case EDIT_COMMENT: {
            let newState = {...state}
            newState[action.comment.id] = action.comment
            return newState
        }
        case DELETE_COMMENT: {
            let newState = {...state}
            delete newState[action.comment.id]
            return newState
        }
        default:
            return state
    }
}
