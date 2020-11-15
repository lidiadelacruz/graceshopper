import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleHome} from '../store/singleHome'

class SingleHome extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.homeId
    this.props.fetchSingleHome(id)
  }

  render() {
    const home = this.props.home

    return (
      <div id="single-home">
        <h1 id="home-price">{home.price}</h1>
        <span id="home-status">{home.status}</span>
        <span id="home-inventory">{home.inventory}</span>
        <img src={home.imageUrl} />
        <h3 id="home-type">{home.type}</h3>
        <p id="home-description">{home.description}</p>
      </div>
    )
  }
}

const mapState = state => {
  return {
    home: state.home
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleHome: id => dispatch(fetchSingleHome(id))
  }
}

export default connect(mapState, mapDispatch)(SingleHome)
