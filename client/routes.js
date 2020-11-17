import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllUsers,
  AllHomes,
  SingleHome,
  Cart
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {/* <Route exact path="/login" component={Login} /> */}
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/users" component={AllUsers} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/homes" component={AllHomes} />
          <Route exact path="/homes/:homesId" component={SingleHome} />
          {isLoggedIn ? (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/myaccount" component={UserHome} />
            </Switch>
          ) : (
            <Route path="/myaccount" component={Login} />
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={AllHomes} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
