import axios from 'axios'

//action type
//in relation to NavBar accessed. Click navbar - cart component (class component - save local state - once rendered, pull this cart, if no cart, create an empty cart) This is created in api/cart.js find or Create.
const GOT_CART = 'GOT_CART'

//getting a new home and adding it to our cart
//from our single home component, we will be adding the the cart a home
const ADD_TO_CART = 'ADD_TO_CART'

//from the cart component these will happen
//increasing the quantity (user can have more than one home)
const ADD_QUANTITY_TO_CART = 'ADD_QUANTITY_TO_CART'

//decreasing the quantity (user can have more than one home)
const SUB_QUANTITY_TO_CART = 'SUB_QUANTITY_TO_CART'

//remove a home from the cart
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

//empty cart
const DELETED_CART = 'DELETED_CART'

//action creators
//for cart view
//what is gotCart getting from the database to display cart?
//cart as a perssistant session

//new pending order or a users already pending order
const gotCart = cart => {
  return {type: GOT_CART, cart}
}

//quantity, price - we will need more than just the homeId
const addToCart = home => {
  return {type: ADD_TO_CART, home}
}

const addToQuantity = home => {
  return {type: ADD_QUANTITY_TO_CART, home}
}

//thunk creator

//fetchCart
export const fetchCart = () => {
  return async dispatch => {
    try {
      console.log('before axios')
      const {data} = await axios.get('/api/cart')
      console.log('DATA', data)
      dispatch(gotCart(data))
      console.log('After dispatch')
    } catch (error) {
      console.log(error)
    }
  }
}

//Add Home
//axios request - what are we getting from the backend? communication to backend to get homeId? put!!! request because we are updating an existing "cart/order".
export const addNewHome = home => {
  return async dispatch => {
    try {
      if (home.user) {
        const {data} = await axios.put('/api/cart', home)
        dispatch(addToCart(data))
      } else {
        dispatch(addToCart(home.home))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

//Increasing the QTY of a home
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
//Redux action type/creator for retrieving the current cart

//checkout button
//cart view
//add, remove, update

const cart = []

//conside state to be [] for length functionality - check if it is empty/number of items
function cartReducer(state = cart, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case ADD_TO_CART:
      const newItem = {
        id: action.home.homeId,
        price: action.home.price,
        status: action.home.status
      }
      return [...state, newItem]
    default:
      return state
  }
}

export default cartReducer
