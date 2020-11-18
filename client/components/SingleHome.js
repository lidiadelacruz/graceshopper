import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleHome} from '../store/singleHome'
import {addNewHome} from '../store/cart'
import HomeUpdateForm from './HomeUpdateForm'

class SingleHome extends React.Component {
  constructor() {
    super()
    this.addHomes = this.addHomes.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.homesId
    this.props.fetchSingleHome(id)
  }
  addHomes(home) {
    let valueHome = {
      cart: this.props.cart,
      home: home,
      user: this.props.user
    }
    this.props.addHome(valueHome)
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
          {home.status !== 'Sold' ? (
            <button
              type="button"
              onClick={() => this.addHomes(home)}
              id="add-cart"
            >
              Add to Cart
            </button>
          ) : (
            ''
          )}
        </div>
        <br />
        {this.props.user.isAdmin ? (
          <p className="home-form">
            <h3>Update This Home</h3>
            <HomeUpdateForm />
          </p>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    home: state.home,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleHome: id => dispatch(fetchSingleHome(id)),
    addHome: home => dispatch(addNewHome(home))
  }
}

export default connect(mapState, mapDispatch)(SingleHome)
