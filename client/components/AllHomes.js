import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchHomes} from '../store/allHomes'

class AllHomes extends Component {
  componentDidMount() {
    this.props.fetchHomes()
  }

  render() {
    const homes = this.props.homes || []
    return (
      <div>
        <h1>All Homes Inventory</h1>
        <div className="all-homes">
          {homes.map(home => {
            return (
              <div className="homes" key={home.id}>
                <p>{home.imageUrl}</p>
                <p>Type:{home.type}</p>
                <p>Price:{home.price}</p>
                <p>Status:{home.status}</p>
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
    homes: state.homes
  }
}

const mapDispatch = dispatch => {
  return {
    fetchHomes: () => dispatch(fetchHomes())
  }
}

export default connect(mapState, mapDispatch)(AllHomes)
