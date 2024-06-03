import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

const TaskList = ({
  tasks,
  onDeleteTask,
  onTaskCompleted,
  clickOnInput,
  onEditTask,
  createdAt,
  startTimer,
  pauseTimer,
}) => {
  const taskComponents = tasks.map((task) => (
    <Task
      key={task.id}
      task={task}
      onDelete={() => onDeleteTask(task.id)}
      onTaskCompleted={onTaskCompleted}
      clickOnInput={clickOnInput}
      onEditTask={onEditTask}
      createdAt={createdAt}
      minutes={task.minutes}
      seconds={task.seconds}
      startTimer={startTimer}
      pauseTimer={() => pauseTimer(task.id)}
    />
  ))

  return <ul className="todo-list">{taskComponents}</ul>
}

TaskList.defaultProps = {
  tasks: [],
  onDeleteTask: () => {},
  onTaskCompleted: () => {},
  clickOnInput: () => {},
  onEditTask: () => {},
  createdAt: new Date(),
  minutes: '',
  seconds: '',
  startTimer: () => {},
  pauseTimer: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onTaskCompleted: PropTypes.func.isRequired,
  clickOnInput: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  startTimer: PropTypes.func,
  pauseTimer: PropTypes.func,
}

export default TaskList
