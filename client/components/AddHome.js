import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addHomeThunk} from '../store/allHomes'

class AddHome extends Component {
  constructor() {
    super()
    this.state = {
      type: '',
      description: '',
      price: 0,
      imageUrl: '',
      status: 'Available',
      inventory: 0
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
      await this.props.sendHomeToPost(newHomeObj)
      this.setState({
        type: '',
        description: '',
        price: 0,
        imageUrl: '',
        status: 'Available',
        inventory: 0
      })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div className="add-home">
        <h3>Add A Home</h3>
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
              <input name="price" type="float" />
            </div>
            <div>
              <label htmlFor="inventory">
                <small>Inventory</small>
              </label>
              <input name="inventory" type="integer" />
            </div>
          </p>
          <div>
            <button type="submit">Add Home</button>
          </div>
        </form>
      </div>
    )
  }
}

// const mapState = state => {
//   return {

//   }
// }

const mapDispatch = dispatch => {
  return {
    sendHomeToPost: homeObj => dispatch(addHomeThunk(homeObj))
  }
}

export default connect(null, mapDispatch)(AddHome)
