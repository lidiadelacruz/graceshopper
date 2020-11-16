import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/allUsers'
import {Link} from 'react-router-dom'

class AllUsers extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const users = this.props.users || []
    return (
      <div className="user-page">
        <h1>All Users</h1>
        {users === [] ? (
          <div className="user-list">
            {users.map(user => {
              return (
                <div className="user" key={user.id}>
                  <Link to={`/users/${user.id}`} className="user-link">
                    {user.fullName}
                  </Link>
                  {user.isAdmin === true ? (
                    <div>This user has admin privileges</div>
                  ) : (
                    <button type="button">Make Admin</button>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div>Only admin users can view this page.</div>
        )}
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
