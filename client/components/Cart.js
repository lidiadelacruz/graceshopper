import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, addNewHome, increaseQty} from '../store/cart'

export class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      homes: [],
      orderTotal: 0,
      orderId: ''
    }
  }

  componentDidMount() {
    this.props.getCart()
  }

  render() {
    const cart = this.props.cart || {}
    console.log('CART', cart)
    return (
      <div>
        <p>{cart[0].price}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(fetchCart())
})

export default connect(mapStateToProps, mapDispatch)(Cart)
