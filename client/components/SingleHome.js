import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleHome} from '../store/singleHome'

class SingleHome extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.homesId
    this.props.fetchSingleHome(id)
  }

  render() {
    const home = this.props.home
    const price = `$` + `${home.price}`
    const info = `${home.type} | ${home.status}`

    return (
      <div className="single-home">
        <img src={home.imageUrl} height="350" width="350" />
        <div>
          <h1>{price}</h1>
          <h1>{info}</h1>
          <p>{home.description}</p>
          <button id="add-cart">Add to Cart</button>
        </div>
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
