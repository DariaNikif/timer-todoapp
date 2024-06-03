import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

const TaskFilter = ({ onFilterTasks }) => {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const handleClick = (filter) => {
    onFilterTasks(filter)
    setSelectedFilter(filter)
  }

  return (
    <ul className="filters">
      <li>
        <button onClick={() => handleClick('all')} className={selectedFilter === 'all' ? 'selected' : ''}>
          All
        </button>
      </li>
      <li>
        <button onClick={() => handleClick('active')} className={selectedFilter === 'active' ? 'selected' : ''}>
          Active
        </button>
      </li>
      <li>
        <button onClick={() => handleClick('completed')} className={selectedFilter === 'completed' ? 'selected' : ''}>
          Completed
        </button>
      </li>
    </ul>
  )
}

TaskFilter.defaultProps = {
  onFilterTasks: () => {},
}

TaskFilter.propTypes = {
  onFilterTasks: PropTypes.func,
}

export default TaskFilter
