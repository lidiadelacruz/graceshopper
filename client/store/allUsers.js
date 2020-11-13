import axios from 'axios'

// action types
const GET_USERS = 'GET_USERS'
const POST_USER = 'POST_USER'
const DELETE_USER = 'DELETE_USER'

// action creators
const setUsers = users => ({type: GET_USERS, users})
const gotUserFromServer = user => ({type: POST_USER, user})
const deleteUser = userId => ({type: DELETE_USER, userId})

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
    default:
      return state
  }
}
