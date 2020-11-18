import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchHomes} from '../store/allHomes'
import {Link} from 'react-router-dom'
import AddHome from './AddHome'

class AllHomes extends Component {
  componentDidMount() {
    this.props.fetchHomes()
  }

  render() {
    const homes = this.props.homes || []
    return (
      <div className="homes-page">
        <h1>All Homes Inventory</h1>
        <br />
        {this.props.user.isAdmin ? (
          <div>
            <AddHome />
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
                        onClick={this.removeHome}
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
    fetchHomes: () => dispatch(fetchHomes())
  }
}

export default connect(mapState, mapDispatch)(AllHomes)
