import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store/singleUser'

class SingleUser extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.userId
    this.props.getSingleUser(id)
    // this.history.push(`./users/${this.props.user.id}`)
  }

  render() {
    const user = {} || this.props.home
    return (
      <div id="single-user">
        <h1 id="user-name">{user.fullName}</h1>
        <div>
          <button type="button">Make {user.firstName} an Admin User</button>
        </div>
        <div>
          <button type="button">Delete this user account</button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleUser: id => dispatch(fetchSingleUser(id))
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
