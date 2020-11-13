import Axios from 'axios'

const GET_SINGLE_HOME = 'GET_SINGLE_HOME'

const getSingleHome = home => ({
  type: GET_SINGLE_HOME,
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

const initialState = {}

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_HOME:
      return action.home
    default:
      return state
  }
}
