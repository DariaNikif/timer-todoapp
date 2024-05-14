import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../TasksFilter/TasksFilter'
import './Footer.css'

export default class Footer extends Component {
  static defaultProps = {
    onFilterTasks: () => {},
    countIncompleteTasks: () => {},
    onClearCompletedTasks: () => {},
  }

  static propTypes = {
    onFilterTasks: PropTypes.func,
    countIncompleteTasks: PropTypes.func,
    onClearCompletedTasks: PropTypes.func,
  }

  render() {
    const { onFilterTasks, countIncompleteTasks } = this.props
    return (
      <footer className="footer">
        <span className="todo-count"> {countIncompleteTasks()} items left</span>
        <TaskFilter onFilterTasks={onFilterTasks} />
        <button className="clear-completed" onClick={this.props.onClearCompletedTasks}>
          Clear completed
        </button>
      </footer>
    )
  }
}
