import React from 'react'
import {connect} from 'react-redux'

class SingleHome extends React.Component {
  componentDidMount() {
    // call on thunk here for fetching a single home
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
