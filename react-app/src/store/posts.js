const LOAD_POSTS = '/posts/all'
const NEW_POST = '/posts/new'



const createPost = (post) => ({
    type: NEW_POST,
    post
})
const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
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
        if (data.errors) {
            return
        } else dispatch(createPost(data))
    }
}

const initialState = {normalizedPosts: {}}

export default function postsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_POSTS:
            newState = {...state}
            action.posts.allPosts.forEach(el => {
                newState.normalizedPosts[el.id] = el
            })
            return newState
        case NEW_POST:
            newState = {...state}
            newState[action.post.new_post.id] = action.data
            return newState
        default:
            return state
    }
  }
