import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

export default class TaskFilter extends Component {
  static defaultProps = {
    onFilterTasks: () => {},
  }

  static propTypes = {
    onFilterTasks: PropTypes.func,
  }

  constructor() {
    super()
    this.state = {
      selectedFilter: 'all',
    }
  }

  handleClick = (filter) => {
    const { onFilterTasks } = this.props
    onFilterTasks(filter)
    this.setState({ selectedFilter: filter })
  }

  render() {
    const { selectedFilter } = this.state

    return (
      <ul className="filters">
        <li>
          <button onClick={() => this.handleClick('all')} className={selectedFilter === 'all' ? 'selected' : ''}>
            All
          </button>
        </li>
        <li>
          <button onClick={() => this.handleClick('active')} className={selectedFilter === 'active' ? 'selected' : ''}>
            Active
          </button>
        </li>
        <li>
          <button
            onClick={() => this.handleClick('completed')}
            className={selectedFilter === 'completed' ? 'selected' : ''}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
