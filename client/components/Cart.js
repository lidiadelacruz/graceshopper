import React, {useContext} from 'react'
import {CartContext} from './CartContext'

// Why not use Redux for the cart?

export const Cart = () => {
  const [cart, setCart] = useContext(CartContext)
  return (
    <div>
      <span>items in cart: {cart.length}</span>
      <br />

      <span>total price: </span>
    </div>
  )
}
//<UpdateCampus campusId={singleCampus.id} />
