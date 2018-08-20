import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../action-creators'
import './style.css'

const limits = {
  user: {
    min: 5,
    max: 50
  },
  text: {
    min: 5,
    max: 50
  }
}

class CommentForm extends Component {
  static propTypes = {}
  state = {
    user: '',
    text: ''
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        user:{' '}
        <input
          value={this.state.user}
          onChange={this.handleChange('user')}
          className={this.getClassName('user')}
        />
        comment:{' '}
        <input
          value={this.state.text}
          onChange={this.handleChange('text')}
          className={this.getClassName('text')}
        />
        <input type="submit" value="submit" disabled={!this.isValidForm()} />
      </form>
    )
  }
  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.addComment(this.state)
    this.setState({
      user: '',
      text: ''
    })
  }
  isValidForm = () => ['user', 'text'].every(this.isValidField)
  isValidField = (type) => this.state[type].length >= limits[type].min
  getClassName = (type) => (this.isValidField(type) ? '' : 'form-input__error')
  handleChange = (type) => (ev) => {
    const { value } = ev.target
    if (value.length > limits[type].max) return
    this.setState({
      [type]: value
    })
  }
}

export default connect(
  null,
  (dispatch, ownProps) => ({
    addComment: (comment) => dispatch(addComment(comment, ownProps.articleId))
  })
)(CommentForm)