import axios from 'axios'

// action type
const PAYMENT_SAVED = 'PAYMENT_SAVED'

// action creator
const postedPayment = payment => ({
  type: PAYMENT_SAVED,
  payment
})

// thunk creator
export const postedPaymentThunk = paymentInfoObj => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/paymentInfo', paymentInfoObj)
      dispatch(postedPayment(data))
    } catch (err) {
      console.error(err)
    }
  }
}
// initial state
const initialState = {}

// reducer
export default function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case PAYMENT_SAVED:
      return action.payment
    default:
      return state
  }
}
