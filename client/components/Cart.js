import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, addNewHome, increaseQty, deleteItem} from '../store/cart'

export class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      homes: [],
      orderTotal: 0,
      orderId: ''
    }
    this.removeHomeFromCart = this.removeHomeFromCart.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  removeHomeFromCart(event) {
    this.props.removeFromCart(event.target.id)
  }

  render() {
    const cart = this.props.cart || {}
    const homes = cart.homes || []
    return (
      <div className="cart-page">
        <h1>My Cart</h1>
        <ul className="cart">
          {homes.map(home => {
            return (
              <ul key={home.id}>
                <img src={home.imageUrl} width="300" height="300" />
                <br />
                <button
                  type="button"
                  id={home.id}
                  onClick={this.removeHomeFromCart}
                >
                  Remove From Cart
                </button>
                <li>Price:$ {home.price}</li>
                <br />
                <br />
              </ul>
            )
          })}
        </ul>
        <h4>Cart Total: ${cart.orderTotal}</h4>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(fetchCart()),
  removeFromCart: homeId => dispatch(deleteItem(homeId))
})

export default connect(mapStateToProps, mapDispatch)(Cart)
