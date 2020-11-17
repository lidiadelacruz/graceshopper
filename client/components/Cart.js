import React from 'react'

export class Cart extends React.Component {
  render() {
    const cart = this.props.cart || {}
    return <div />
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})
