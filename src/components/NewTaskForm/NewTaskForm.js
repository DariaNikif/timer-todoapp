import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

const NewTaskForm = ({ onAddTask }) => {
  const [text, setText] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const textInput = (e) => {
    setText(e.target.value)
  }

  const minutesInput = (e) => {
    setMinutes(e.target.value)
  }

  const secondsInput = (e) => {
    setSeconds(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()

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

      onAddTask(newTask, minutes, seconds)
      setText('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (
    <form className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={text}
        onChange={textInput}
        onKeyPress={handleKeyPress}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        onChange={minutesInput}
        onKeyPress={handleKeyPress}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        onChange={secondsInput}
        onKeyPress={handleKeyPress}
      />
    </form>
  )
}

NewTaskForm.defaultProps = {
  onAddTask: () => {},
  minutes: '',
  seconds: '',
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
}

export default NewTaskForm
