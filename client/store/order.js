import axios from 'axios'

// action type
const ORDER_COMPLETE = 'ORDER_COMPLETE'

// action creator
const orderComplete = order => ({
  type: ORDER_COMPLETE,
  order
})

// thunk creator
export const checkedOut = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/orders', userId)
      dispatch(orderComplete(data))
    } catch (err) {
      console.error(err)
    }
  }
}
// initial state
const initialState = {}

// reducer
export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER_COMPLETE:
      return action.order
    default:
      return state
  }
}
