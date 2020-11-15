import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn = false}) => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img
              src="img/nbh-logo.png"
              height="50"
              width="50"
              alt="Never Before Homes Logo"
            />
          </Link>
          <h1>Never Before Homes</h1>
        </div>
        <div className="nav-right">
          {isLoggedIn ? (
            <div className="nav-links">
              {/* The navbar will show these links after you log in */}
              <Link to="/homes">Homes</Link>
              <Link to="/myaccount">My Account</Link>
              <Link to="/cart">
                <img
                  src="img/cart-icon.png"
                  height="30"
                  width="30"
                  alt="Cart Icon"
                />
              </Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div className="nav-links">
              {/* The navbar will show these links before you log in */}
              <Link to="/homes">Homes</Link>
              <Link to="/login">My Account</Link>
              <Link to="/cart">
                <img
                  src="img/cart-icon.png"
                  height="30"
                  width="30"
                  alt="Cart Icon"
                />
              </Link>
              <button>
                <Link to="/login">Login</Link>
              </button>
              <button>
                <Link to="/signup">Sign Up</Link>
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

Navbar.defaultProps = {isLoggedIn: false}
