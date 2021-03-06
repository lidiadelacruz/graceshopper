import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchHomes, deleteHomeThunk} from '../store/allHomes'
import {Link} from 'react-router-dom'
import AddHome from './AddHome'

class AllHomes extends Component {
  constructor() {
    super()
    this.removeHome = this.removeHome.bind(this)
  }
  componentDidMount() {
    this.props.fetchHomes()
  }

  async removeHome(homeId) {
    await this.props.deleteHome(homeId)
    await this.props.fetchHomes()
  }

  render() {
    const homes = this.props.homes || []
    return (
      <div className="homes-page">
        <h1>All Homes Inventory</h1>
        <br />
        {this.props.user.isAdmin ? (
          <div>
            <div className="home-form">
              <h3>Add A Home</h3>
              <AddHome />
            </div>
            <ul className="all-homes">
              {homes.map(home => {
                return (
                  <ul key={home.id}>
                    <h2>Type: {home.type}</h2>
                    <Link to={`/homes/${home.id}`}>
                      <img src={home.imageUrl} width="150" height="150" />
                    </Link>
                    <li>Price:$ {home.price}</li>
                    <li>Status: {home.status}</li>
                    <p>
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => this.removeHome(home.id)}
                      >
                        Delete This Home
                      </button>
                    </p>
                    <p>
                      <Link to={`/homes/${home.id}`}>
                        <button type="button" className="secondary-button">
                          Update This Home
                        </button>
                      </Link>
                    </p>
                    <br />
                    <br />
                  </ul>
                )
              })}
            </ul>
          </div>
        ) : (
          <ul className="all-homes">
            {homes.map(home => {
              return (
                <ul key={home.id}>
                  <h2>Type: {home.type}</h2>
                  <Link to={`/homes/${home.id}`}>
                    <img src={home.imageUrl} width="300" height="300" />
                  </Link>
                  <li>Price:$ {home.price}</li>
                  <li>Status: {home.status}</li>
                  <br />
                  <br />
                </ul>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    homes: state.allHomes,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchHomes: () => dispatch(fetchHomes()),
    deleteHome: homeId => dispatch(deleteHomeThunk(homeId))
  }
}

export default connect(mapState, mapDispatch)(AllHomes)
