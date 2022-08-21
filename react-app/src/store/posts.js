const LOAD_POSTS = '/posts/all'
// const NEW_POST = '/posts/new'

const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
})

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch('/api/posts')

    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return
        } else dispatch(loadPosts(data))
    }
}

const initialState = {normalizedPosts: {}}

export default function postsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_POSTS:
            newState = {...state}
            console.log(action)
            action.posts.allPosts.forEach(el => {
                newState.normalizedPosts[el.id] = el
            })
            return newState
        default:
            return state
    }
  }
