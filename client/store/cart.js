import axios from 'axios'

//Action Types

//Relates to NavBar - when cart is clicked.
const GOT_CART = 'GOT_CART'

//getting a new home and adding it to our cart
export const ADD_TO_CART = 'ADD_TO_CART'

//increasing the quantity (user can have more than one home)
const ADD_QUANTITY_TO_CART = 'ADD_QUANTITY_TO_CART'

//decreasing the quantity (user can have more than one home)
const SUB_QUANTITY_TO_CART = 'SUB_QUANTITY_TO_CART'

//remove a home from the cart
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

//empty cart
const DELETED_CART = 'DELETED_CART'

//Action Creators

const gotCart = cart => {
  return {type: GOT_CART, cart}
}

const addToCart = cart => {
  return {type: ADD_TO_CART, cart}
}

const addToQuantity = home => {
  return {type: ADD_QUANTITY_TO_CART, home}
}

const deleteItemFromCart = homeId => {
  return {type: REMOVE_FROM_CART, homeId}
}
//Thunk Creator

//fetchCart
export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(gotCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//addNewHome
export const addNewHome = home => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/cart', home)
      dispatch(addToCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//increaseQty
export const increaseQty = home => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/cart/${orderId}/${home.homeId}`,
        home
      )
      dispatch(addToQuantity(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteItem = homeId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/cart/${homeId}`)
      dispatch(deleteItemFromCart(homeId))
    } catch (error) {
      console.log(error)
    }
  }
}

//Cart Reducer

//initial state
const cart = {}

function cartReducer(state = cart, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case ADD_TO_CART:
      return action.cart
    case REMOVE_FROM_CART:
      const newState = {
        ...state,
        homes: state.homes.filter(home => home.id != action.homeId)
      }
      newState.orderTotal = newState.homes.reduce(
        (acc, home) => acc + home.price,
        0
      )
      return newState
    default:
      return state
  }
}

export default cartReducer
