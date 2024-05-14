import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './Task.css'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      completed: false,
      editing: false,
      editingTaskText: '',
      currentTime: props.task.currentTime,
    }
  }

  static defaultProps = {
    task: {},
    className: '',
    onDelete: () => {},
    onTaskCompleted: () => {},
    clickOnInput: () => {},
    onEditTask: () => {},
    createdAt: new Date(),
    minutes: '',
    seconds: '',
    startTimer: () => {},
    pauseTimer: () => {},
  }

  static propTypes = {
    task: PropTypes.object.isRequired,
    className: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onTaskCompleted: PropTypes.func.isRequired,
    clickOnInput: PropTypes.func.isRequired,
    onEditTask: PropTypes.func.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    minutes: PropTypes.string,
    seconds: PropTypes.string,
    startTimer: PropTypes.func,
    pauseTimer: PropTypes.func,
  }

  handleStartTimer = () => {
    const { startTimer, task } = this.props
    startTimer(task.id)
  }

  handlePauseTimer = () => {
    const { pauseTimer } = this.props
    pauseTimer()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.task.completed !== this.props.task.completed) {
      if (this.props.task.completed) {
        clearInterval(this.timerId)
        this.setState({ currentTime: 0 })
      }
    }

    if (prevProps.task.currentTime !== this.props.task.currentTime) {
      this.setState({ currentTime: this.props.task.currentTime })
    }
  }

  handleEdit = () => {
    this.setState({ editing: true, editingTaskText: this.props.task.text })
  }

  handleInputChange = (e) => {
    this.setState({ editingTaskText: e.target.value })
  }

  handleSave = () => {
    const { task } = this.props
    const { editingTaskText } = this.state
    if (editingTaskText.trim() !== '') {
      this.props.onEditTask(task.id, editingTaskText)
      this.setState({ editing: false })
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSave()
    }
  }

  render() {
    const { task, className, onDelete } = this.props
    const { editing, editingTaskText, currentTime } = this.state
    const liClassName = `${className ? `${className} ` : ''}${task.completed ? 'completed' : ''}${editing ? ' editing' : ''}`

    return (
      <li className={liClassName}>
        <div className="view">
          {!editing ? (
            <>
              <input
                className="toggle"
                type="checkbox"
                onClick={() => this.props.clickOnInput(task.id)}
                defaultChecked={task.completed}
              />
              <label>
                <span className="description title">{task.text}</span>
                <span className="description control-timer">
                  <button className="icon icon-play" onClick={() => this.handleStartTimer(task.id)}></button>
                  <button className="icon icon-pause" onClick={this.handlePauseTimer}></button>
                  <span>
                    {`${Math.floor(currentTime / 60)}:${currentTime % 60 < 10 ? '0' : ''}${currentTime % 60}`}
                  </span>
                </span>
                <span className="description">{formatDistanceToNow(new Date(this.props.createdAt))}</span>
              </label>
              <button className="icon icon-edit" onClick={this.handleEdit} />
              <button className="icon icon-destroy" onClick={onDelete} />
            </>
          ) : (
            <input
              className="edit"
              type="text"
              value={editingTaskText}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              autoFocus
            />
          )}
        </div>
      </li>
    )
  }
}
