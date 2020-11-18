import React, {Component} from 'react'
import {connect} from 'react-redux'
import {checkedOut} from '../store/order'
import {postedPaymentThunk} from '../store/paymentInfo'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shippingAddress: '',
      firstName: '',
      middleInitial: '',
      lastName: '',
      creditOrDebitCardNumber: '',
      cardExpirationDate: '', // 'mm/yyyy'
      cardCVV: '',
      billingAddress: '',
      billingZipcode: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(evt) {
    try {
      evt.preventDefault()
      await this.props.checkedOut({id: this.props.user.id})
      const paymentInfoObj = {
        user: this.props.user,
        firstName: this.state.firstName,
        middleInitial: this.state.middleInitial,
        lastName: this.state.lastName,
        creditOrDebitCardNumber: this.state.creditOrDebitCardNumber,
        cardExpirationDate: this.state.cardExpirationDate,
        cardCVV: this.state.cardCVV,
        billingAddress: this.state.billingAddress,
        billingZipcode: this.state.billingZipcode
      }
      await this.props.postPaymentInfo(paymentInfoObj)
      this.setState({
        shippingAddress: '',
        firstName: '',
        middleInitial: '',
        lastName: '',
        creditOrDebitCardNumber: '',
        cardExpirationDate: '',
        cardCVV: '',
        billingAddress: '',
        billingZipcode: ''
      })
      this.props.history.push(`/confirmation`)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div>
        <form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          name={name}
        >
          <h5>Shipping Information</h5>
          <p>
            <div>
              <label htmlFor="shippingAddress">
                <small>Where would you like this order shipped?</small>
              </label>
              <input name="shippingAddress" type="text" />
            </div>
          </p>
          <h5>Billing Information</h5>
          <p>
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="middleInitial">
                <small>Middle Initial</small>
              </label>
              <input name="middleInitial" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
          </p>
          <p>
            <div>
              <label htmlFor="creditOrDebitCardNumber">
                <small>Card Number</small>
              </label>
              <input name="creditOrDebitCardNumber" type="text" />
            </div>
            <div>
              <label htmlFor="cardExpirationDate">
                <small>Expiration Date (MM/YYYY)</small>
              </label>
              <input name="cardExpirationDate" type="text" />
            </div>
            <div>
              <label htmlFor="cardCVV">
                <small>CVV</small>
              </label>
              <input name="cardCVV" type="text" />
            </div>
          </p>
          <p>
            <div>
              <label htmlFor="billingAddress">
                <small>Billing Address</small>
              </label>
              <input name="billingAddress" type="text" />
            </div>
            <div>
              <label htmlFor="billingZipcode">
                <small>Zip Code</small>
              </label>
              <input name="billingZipcode" type="text" />
            </div>
          </p>
          <p>
            <div>
              <button type="submit">Place Your Order</button>
            </div>
          </p>
          {/* For input validation: */}
          {/* {error && error.response && <div> {error.response.data} </div>} */}
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    order: state.order,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    checkedOut: userId => dispatch(checkedOut(userId)),
    postPaymentInfo: paymentInfoObj =>
      dispatch(postedPaymentThunk(paymentInfoObj))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
