import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/allUsers'
// import {Link} from 'react-router-dom';

class AllUsers extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const users = this.props.users || []
    return (
      <div>
        <h2>All Users</h2>
        <div className="user-list">
          {users.map(user => {
            return (
              <div className="all-users" key={user.id}>
                <li>{user.fullName}</li>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.allUsers
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(fetchAllUsers())
    //deleteUser: (userId) => dispatch(deleteUserThunk(userId))
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
