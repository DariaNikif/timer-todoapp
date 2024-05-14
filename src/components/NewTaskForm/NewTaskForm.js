import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  static defaultProps = {
    onAddTask: () => {},
    minutes: '',
    seconds: '',
  }

  static propTypes = {
    onAddTask: PropTypes.func,
    minutes: PropTypes.string,
    seconds: PropTypes.string,
  }

  constructor() {
    super()
    this.state = {
      text: '',
      minutes: '',
      seconds: '',
    }
  }

  minutesInput = (e) => {
    this.setState({ minutes: e.target.value })
  }

  secondsInput = (e) => {
    this.setState({ seconds: e.target.value })
  }

  textInput = (e) => {
    this.setState({ text: e.target.value })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      const { text, minutes, seconds } = this.state

      if (isNaN(minutes) || isNaN(seconds) || parseInt(minutes) < 0 || parseInt(seconds) < 0) {
        alert('Please enter valid numbers for minutes and seconds.')
        return
      }

      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        text: text,
        minutes: minutes,
        seconds: seconds,
      }
      this.props.onAddTask(newTask, minutes, seconds)
      this.setState({ text: '', minutes: '', seconds: '' })
    }
  }

  render() {
    return (
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.text}
          onChange={this.textInput}
          onKeyPress={this.handleKeyPress}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={this.state.minutes}
          onChange={this.minutesInput}
          onKeyPress={this.handleKeyPress}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={this.state.seconds}
          onChange={this.secondsInput}
          onKeyPress={this.handleKeyPress}
        />
      </form>
    )
  }
}
