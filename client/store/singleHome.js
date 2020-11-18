import Axios from 'axios'
import {ADD_TO_CART} from './cart'

const GET_SINGLE_HOME = 'GET_SINGLE_HOME'
const UPDATE_HOME = 'UPDATE_HOME'

const getSingleHome = home => ({
  type: GET_SINGLE_HOME,
  home
})

const updateHome = home => ({
  type: UPDATE_HOME,
  home
})

export const fetchSingleHome = id => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/homes/${id}`)
      dispatch(getSingleHome(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateHomeThunk = home => {
  return async dispatch => {
    try {
      console.log('here', home)
      await Axios.put(`/api/homes/${home.id}`, home)
      dispatch(updateHome(home))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {}

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_HOME:
      return action.home
    case ADD_TO_CART:
      const myHome = action.cart.homes.find(home => home.id === state.id)
      return myHome ? myHome : state
    case UPDATE_HOME:
      return action.home
    default:
      return state
  }
}
