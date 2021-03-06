import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const UPDATE_USER = 'UPDATE_USER'
export const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user}) // change isLoggedIn to true
const removeUser = () => ({type: REMOVE_USER}) // change isLoggedIn to false
const updateUser = updatedUserObj => ({
  type: UPDATE_USER,
  updatedUserObj
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/myaccount')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleUser = userId => {
  return async dispatch => {
    try {
      await axios.get(`/api/users/${userId}`)
      dispatch(getUser(userId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateUserThunk = (userId, updatedUserObj) => {
  return async dispatch => {
    try {
      await axios.put(`/api/users/${userId}`, updatedUserObj)
      dispatch(updateUser(userId, updatedUserObj))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function userReducer(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case UPDATE_USER:
      return action.updatedUserObj
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
