import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchHomes} from '../store/allHomes'

class AllHomes extends Component {
  componentDidMount() {
    this.props.fetchHomes()
  }

  render() {
    const homes = this.props.homes || []
    console.log('HOMES', homes)
    return (
      <div>
        <h1>All Homes Inventory</h1>
        <ul className="all-homes">
          {homes.map(home => {
            return (
              <ul key={home.id}>
                <li>Type:{home.type}</li>
                <img src={home.imageUrl} />
                <li>Price:${home.price}</li>
                <li>Status:{home.status}</li>
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
