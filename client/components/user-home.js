import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AllUsers} from './AllUsers'
import {AllHomes} from './AllHomes'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, isAdmin} = props

  return (
    <div className="user-welcome">
      <h1>Welcome, {firstName}</h1>
      {isAdmin ? (
        <div>
          <h2 className="admin-user-view">
            <Link to="/users" component={AllUsers}>
              View all Users
            </Link>
          </h2>
          <h2 className="admin-user-view">
            <Link to="/homes" component={AllHomes}>
              Let's edit our inventory
            </Link>
          </h2>
        </div>
      ) : (
        <h1 id="one-click-home">
          <Link to="/homes" component={AllHomes}>
            Your dream home is one click away!
          </Link>
        </h1>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string
}
