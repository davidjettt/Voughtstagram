const LOAD_POSTS = '/posts/all'
const NEW_POST = '/posts/new'
const UPDATE_POST = '/posts/update'
const DELETE_POST = '/posts/delete'
/*joon-toggle post like action */
const ADD_POST_LIKE = '/posts/ADD_POST_LIKE'
const TOGGLE_POST_LIKE = '/posts/TOGGLE_POST_LIKE'

const createPost = (post) => ({
    type: NEW_POST,
    post
})
const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
})
const updatePost = (post) => ({
    type: UPDATE_POST,
    post
})
const deletePost = (id) => ({
    type: DELETE_POST,
    id
})
/*joon:toggle_post_like action creator */
const togglePostLike = (data) => ({
    type: TOGGLE_POST_LIKE,
    data
})


export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts/', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return
        } else dispatch(loadPosts(data))
    }
}
export const createNewPost = (payload) => async (dispatch) => {
    const response = await fetch('/api/posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createPost(data))
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
}

export const editPost = (payload) => async dispatch => {
    const response = await fetch(`/api/posts/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {

        const post = await response.json();
        dispatch(updatePost(post));
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
};

export const removePost = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deletePost(id))
    }
}


export const postLikeToggle = (postId, userId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/likes`, {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: {
            userId
        }
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(togglePostLike(data))
        return data
    }
}

const initialState = { normalizedPosts: {} }

export default function postsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_POSTS:
            newState = JSON.parse(JSON.stringify(state))
            action.posts.allPosts.forEach(el => {
                newState.normalizedPosts[el.id] = el
            })
            return newState
        case NEW_POST:
            newState = JSON.parse(JSON.stringify(state))
            newState.normalizedPosts[action.post.new_post.id] = action.post.new_post
            return newState
        case UPDATE_POST:
            newState = JSON.parse(JSON.stringify(state))
            newState.normalizedPosts[action.post.post.id] = action.post.post
            return newState
        case DELETE_POST:
            newState = JSON.parse(JSON.stringify(state))
            delete newState.normalizedPosts[action.id]
            return newState
        // case ADD_POST_LIKE:
        //     newState = JSON.parse(JSON.stringify(state))
        //     newState.normalizedPosts[action.post.post_likes.id] = action.post.
        case TOGGLE_POST_LIKE:
            newState = JSON.parse(JSON.stringify(state))
            newState.normalizedPosts[action.data.post.id] = action.data.post
            return newState
        default:
            return state
    }
}
