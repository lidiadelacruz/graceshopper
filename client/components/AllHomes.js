import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchHomes} from '../store/allHomes'
import {Link} from 'react-router-dom'

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
      </div>
    )
  }
}

const mapState = state => {
  return {
    homes: state.allHomes
  }
}

const mapDispatch = dispatch => {
  return {
    fetchHomes: () => dispatch(fetchHomes())
  }
}

export default connect(mapState, mapDispatch)(AllHomes)
