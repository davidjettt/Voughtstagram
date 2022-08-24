
const LOAD_USERS = '/users/ALL'
const FOLLOW_USER = '/users/FOLLOW'
const UNFOLLOW_USER = '/users/UNFOLLOW'

const follow = (data) => {
    return {
        type: FOLLOW_USER,
        data
    }
}

const unfollow = (data) => {
    return {
        type: UNFOLLOW_USER,
        data
    }
}

const loadUsers = (users) => {
    return {
        type: LOAD_USERS,
        users
    }
}

export const followThunk = (profileId) => async (dispatch) => {
    const response = await fetch(`/api/follows/follow/${profileId}`, {
      method: 'POST'
    });
    if (response.ok) {
      const data = await response.json();
      console.log("DATA FOR FOLLOW", data)
      if (data.errors) {
        return;
      }
      dispatch(follow(data));
    }
}
export const unfollowThunk = (profileId) => async (dispatch) => {
    const response = await fetch(`/api/follows/unfollow/${profileId}`, {
      method: 'POST'
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data, "DATA FOR UNFOLLOW")
      if (data.errors) {
        return data.errors;
      }
      dispatch(unfollow(data));
    }
}

export const loadAllUsers = () => async (dispatch) => {
    const response = await fetch('/api/users/', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
      dispatch(loadUsers(data));
    }
}


const initialState = {}

export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_USERS:
            newState = JSON.parse(JSON.stringify(state))
            action.users.users.forEach(user => newState[user.id] = user)
            return newState
        case FOLLOW_USER:
            newState = JSON.parse(JSON.stringify(state))
            newState[action.data.currentUser.id] = action.data.currentUser
            newState[action.data.user.id] = action.data.user
            return newState
        case UNFOLLOW_USER:
            newState = JSON.parse(JSON.stringify(state))
            newState[action.data.currentUser.id] = action.data.currentUser
            newState[action.data.user.id] = action.data.user
            return newState
        default:
            return state;
    }
  }
