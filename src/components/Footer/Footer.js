import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../TasksFilter/TasksFilter'
import './Footer.css'

const Footer = ({ onFilterTasks, countIncompleteTasks, onClearCompletedTasks }) => {
  return (
    <footer className="footer">
      <span className="todo-count"> {countIncompleteTasks()} items left</span>
      <TaskFilter onFilterTasks={onFilterTasks} />
      <button className="clear-completed" onClick={onClearCompletedTasks}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  onFilterTasks: () => {},
  countIncompleteTasks: () => {},
  onClearCompletedTasks: () => {},
}

Footer.propTypes = {
  onFilterTasks: PropTypes.func,
  countIncompleteTasks: PropTypes.func,
  onClearCompletedTasks: PropTypes.func,
}

export default Footer
