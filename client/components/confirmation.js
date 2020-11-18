import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Confirmation = () => {
  return (
    <div className="confirmation">
      <h1>
        Thank you for your order! We've received it and will ship your new home
        in 5-7 days.
      </h1>
    </div>
  )
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {

//   }
// }

// export default connect(mapState)(Confirmation)
