import axios from 'axios'

// action types
const GET_USERS = 'GET_USERS'
const POST_USER = 'POST_USER'
const DELETE_USER = 'DELETE_USER'
const TOGGLE_ADMIN = 'TOGGLE_ADMIN'

// action creators
const setUsers = users => ({type: GET_USERS, users})
const gotUserFromServer = user => ({type: POST_USER, user})
const deleteUser = userId => ({type: DELETE_USER, userId})
const toggleAdmin = userId => ({type: TOGGLE_ADMIN, userId})

// thunk creators
export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(setUsers(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const postUser = userObj => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/users', userObj)
      dispatch(gotUserFromServer(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteUserThunk = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${id}`)
      dispatch(deleteUser(id))
    } catch (err) {
      console.log(`ERROR deleting user with id ${id}`, err)
    }
  }
}

export const toggleAdminThunk = id => {
  return async dispatch => {
    try {
      await axios.put(`/api/users/${id}/admin`)
      dispatch(toggleAdmin(id))
    } catch (err) {
      console.error(err)
    }
  }
}

// initial state
const initialState = []

//reducer
export default function allUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case POST_USER:
      return [...state, action.user]
    case DELETE_USER:
      return state.filter(user => user.id !== action.userId)
    case TOGGLE_ADMIN:
      // This needs to return state with the updated Admin
      return state
    default:
      return state
  }
}
