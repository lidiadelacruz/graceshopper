import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import allUserReducer from './allUsers'
import userReducer from './singleUser'
import homesReducer from './allHomes'
import homeReducer from './singleHome'
import cartReducer from './cart'
import orderReducer from './order'
import paymentReducer from './paymentInfo'

const reducer = combineReducers({
  allUsers: allUserReducer,
  allHomes: homesReducer,
  user: userReducer,
  home: homeReducer,
  cart: cartReducer,
  order: orderReducer,
  payment: paymentReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './singleUser'
