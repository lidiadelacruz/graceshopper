import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchAllUsers,
  deleteUserThunk,
  toggleAdminThunk
} from '../store/allUsers'

class AllUsers extends Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.toggleAdmin = this.toggleAdmin.bind(this)
  }
  componentDidMount() {
    this.props.getUsers()
  }

  async handleDelete(userId) {
    await this.props.deleteUser(userId)
  }

  async toggleAdmin(userId) {
    await this.props.toggleAdmin(userId)
    await this.props.getUsers()
  }

  render() {
    const users =
      this.props.users.sort(function(a, b) {
        if (a.fullName < b.fullName) {
          return -1
        }
        if (a.fullName > b.fullName) {
          return 1
        }
        return 0
      }) || []

    return (
      <div className="user-page">
        <h1>All Users</h1>
        {this.props.isAdmin ? (
          <div className="user-list">
            {users.map(user => {
              return (
                <div className="user" key={user.id}>
                  <h5 className="user-link">{user.fullName}</h5>
                  {user.isAdmin === true ? (
                    <div>
                      <div>This user has admin privileges</div>
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => this.toggleAdmin(user.id)}
                      >
                        Remove Admin
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p>
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => this.toggleAdmin(user.id)}
                        >
                          Make {user.firstName} an Admin User
                        </button>
                      </p>
                      <p>
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => this.handleDelete(user.id)}
                        >
                          Delete this user account
                        </button>
                      </p>
                    </div>
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
    users: state.allUsers,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(fetchAllUsers()),
    deleteUser: userId => dispatch(deleteUserThunk(userId)),
    toggleAdmin: userId => dispatch(toggleAdminThunk(userId))
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
