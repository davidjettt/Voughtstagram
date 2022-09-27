
const LOAD_USERS = '/users/ALL'
const FOLLOW_USER = '/users/FOLLOW'
const UNFOLLOW_USER = '/users/UNFOLLOW'
const UPDATE_USER_SETTINGS = '/users/updateUserSettings'
const REMOVE_USER_AVATAR = '/users/removeAvatar'

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

const updateUserSettings = (user) => {
  return {
    type: UPDATE_USER_SETTINGS,
    user
  }
}

const removeUserAvatar = (user) => {
  return {
    type: REMOVE_USER_AVATAR,
    user
  }
}

export const followThunk = (profileId) => async (dispatch) => {
  const response = await fetch(`/api/follows/follow/${profileId}`, {
    method: 'POST'
  });
  if (response.ok) {
    const data = await response.json();
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

export const updateUserSettingsThunk = (user) => async (dispatch) => {
  const response = await fetch(`/api/users/${user.id}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(updateUserSettings(data))
    return data
  }
  else {
    const badData = await response.json()
    if (badData.errors) return badData
  }
}

export const uploadUserAvatarThunk = (formData, userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/avatar/upload`, {
    method: 'PUT',
    body: formData
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(updateUserSettings(data))
    return data
  } else {
    const badData = await response.json()
    if (badData.errors) return badData.errors
  }
}

export const removeUserAvatarThunk = (user) => async (dispatch) => {
  const response = await fetch(`/api/users/${user.id}/avatar/remove`, {
    method: 'PUT'
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(updateUserSettings(data))
    return data
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
    case UPDATE_USER_SETTINGS:
      newState = JSON.parse(JSON.stringify(state))
      newState[action.user.id] = action.user
      return newState
    // case REMOVE_USER_AVATAR:
    //   newState = JSON.parse(JSON.stringify(state))
    //   newState[action.user]
    default:
      return state;
  }
}
