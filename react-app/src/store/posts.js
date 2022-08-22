const LOAD_POSTS = '/posts/all'
const NEW_POST = '/posts/new'
const UPDATE_POST = '/posts/update'
const DELETE_POST = '/posts/delete'



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
        console.log("returned data from database on succcess", data)
        return dispatch(createPost(data))
    }
}

export const editPost = (payload) => async dispatch => {
    const response = await fetch(`/api/posts/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      const post = await response.json();
      dispatch(updatePost(post));
      return post;
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

const initialState = {normalizedPosts: {}}

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
        default:
            return state
    }
  }
