import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateHomeThunk} from '../store/singleHome'

class HomeUpdateForm extends Component {
  constructor() {
    super()
    this.state = {
      type: '',
      description: '',
      price: 0,
      imageUrl: '',
      status: 'Available',
      inventory: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(evt) {
    try {
      evt.preventDefault()
      const newHomeObj = {
        type: this.state.type,
        description: this.state.description,
        price: this.state.price,
        imageUrl: this.state.imageUrl,
        status: this.state.status,
        inventory: this.state.inventory
      }
      await this.props.updateHome(newHomeObj)
      this.setState({
        type: '',
        description: '',
        price: 0,
        imageUrl: '',
        status: 'Available',
        inventory: 1
      })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div>
        <form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          name={name}
        >
          <p>
            <div>
              <label htmlFor="type">
                <small>House Type</small>
              </label>
              <input name="type" type="text" />
            </div>
            <div>
              <label htmlFor="imageUrl">
                <small>Image URL</small>
              </label>
              <input name="imageUrl" type="text" />
            </div>
            <div>
              <label htmlFor="description">
                <small>Description</small>
              </label>
              <input name="description" type="text" />
            </div>
          </p>
          <p>
            <div>
              <label htmlFor="price">
                <small>Price</small>
              </label>
              <input name="price" type="text" />
            </div>
            <div>
              <label htmlFor="inventory">
                <small>Inventory</small>
              </label>
              <input name="inventory" type="text" />
            </div>
            <div>
              <label htmlFor="status">
                <small>Home Status (Available/Sold)</small>
              </label>
              <input name="status" type="text" />
            </div>
          </p>
          <div>
            <button type="submit">Update Home</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateHome: homeObj => dispatch(updateHomeThunk(homeObj))
  }
}

export default connect(null, mapDispatch)(HomeUpdateForm)
