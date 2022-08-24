
const LOAD_USERS = '/users/ALL'
const FOLLOW_USER = '/users/FOLLOW'
const UNFOLLOW_USER = '/users/UNFOLLOW'

const follow = (profileId) => {
    return {
        type: FOLLOW_USER,
        profileId
    }
}

const unfollow = (profileId) => {
    return {
        type: UNFOLLOW_USER,
        profileId
    }
}

const loadUsers = (users) => {
    return {
        type: LOAD_USERS,
        users
    }
}

export const followThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/follows/follow/${id}`, {
      method: 'POST'
    });
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return;
      }
      dispatch(follow(id));
    }
}
export const unfollowThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/follows/unfollow/${id}`, {
      method: 'POST'
    });
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return;
      }
      dispatch(unfollow(id));
    }
}

export const loadAllUsers = () => async (dispatch) => {
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return;
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
        default:
            return state;
    }
  }
