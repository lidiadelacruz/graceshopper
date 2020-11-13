import axios from 'axios'

//Action Types Past Tense
const GOT_HOMES = 'GOT_HOMES'
const ADDED_HOME = 'ADDED_HOME'
const DELETED_HOME = 'DELETED_HOME'

// Action Creators
export const gotHomes = homes => {
  return {type: GOT_HOMES, homes}
}

export const addedHome = home => {
  return {type: ADDED_HOME, home}
}

export const deletedHome = homeId => {
  return {type: DELETED_HOME, homeId}
}

//Thunk- GOT
export const fetchHomes = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/homes')
      dispatch(gotHomes(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//Thunk - ADD
export const addHomeThunk = body => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/homes', body)
      dispatch(addedHome(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//Thunk- DELETE
export const deleteHomeThunk = homeId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/homes/${homeId}`)
      dispatch(deletedHome(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// reducer

function homesReducer(state = [], action) {
  switch (action.type) {
    case GOT_HOMES:
      return action.homes
    case ADDED_HOME:
      return [...state, action.home]
    case DELETED_HOME:
      return state.filter(home => homeId !== action.homeId)
    default:
      return state
  }
}

export default homesReducer
