import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        { id: 1, text: 'Check mail', completed: false, editing: false, isRunning: false, currentTime: 0 },
        { id: 2, text: 'Drink coffee', completed: false, editing: false, isRunning: false, currentTime: 0 },
        { id: 3, text: 'Buy a cake', completed: false, editing: false, isRunning: false, currentTime: 0 },
      ],
      filter: 'all',
      minutes: '',
      seconds: '',
      currentTime: 0,
      timerIds: {},
    }
  }

  // Изменение значения свойства у элемента
  handleTaskCompleted = (id, completed) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => (task.id === id ? { ...task, completed } : task)),
    }))
  }

  // Добавление задач
  handleAddTask = (newTask, minutes, seconds) => {
    let currentTime = 0

    if (minutes !== '') {
      currentTime += parseInt(minutes) * 60
    }

    if (seconds !== '') {
      currentTime += parseInt(seconds)
    }

    const createdTask = {
      ...newTask,
      createdAt: new Date(),
      currentTime: currentTime,
    }

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, createdTask],
    }))
  }

  //Таймер
  startTimer = (taskId) => {
    clearInterval(this.state.timerIds[taskId])

    const timerId = setInterval(() => {
      const updatedTasks = this.state.tasks.map((task) => {
        if (task.id === taskId && task.currentTime > 0) {
          return { ...task, currentTime: task.currentTime - 1 }
        } else if (task.id === taskId && task.currentTime === 0) {
          clearInterval(this.state.timerIds[taskId])
          return { ...task, isRunning: false }
        }
        return task
      })
      this.updateTaskState(updatedTasks, taskId)
    }, 1000)

    this.setState((prevState) => ({
      timerIds: {
        ...prevState.timerIds,
        [taskId]: timerId,
      },
    }))
  }

  pauseTimer = (taskId) => {
    clearInterval(this.state.timerIds[taskId])
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isRunning: false }
      }
      return task
    })
    this.setState({ tasks: updatedTasks })
  }

  updateTaskState = (updatedTasks, taskId) => {
    const taskToUpdate = updatedTasks.find((task) => task.id === taskId)
    if (taskToUpdate) {
      this.setState({
        tasks: updatedTasks,
        currentTime: taskToUpdate.currentTime,
      })
    } else {
      console.error(`Task with ID ${taskId} not found.`)
    }
  }

  // Удаление задач
  handleDeleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }))
  }

  // Удаление всех выполненных задач
  handleClearCompletedTasks = () => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => !task.completed),
    }))
  }

  // Фильтрация по кнопкам
  handleFilterTasks = (filter) => {
    this.setState({ filter })
  }

  filterTasks = (tasks, filter) => {
    if (filter === 'active') {
      return tasks.filter((task) => !task.completed)
    } else if (filter === 'completed') {
      return tasks.filter((task) => task.completed)
    } else {
      return tasks
    }
  }

  // Состояние задач
  clickOnInput = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    }))
  }

  // Подсчет активных задач
  countIncompleteTasks = () => {
    const { tasks } = this.state
    return tasks.filter((task) => !task.completed).length
  }

  // Редактирование задач
  handleEditTask = (id, newText) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)),
    }))
  }

  render() {
    const { filter, tasks } = this.state
    const filteredTasks = this.filterTasks(tasks, filter)

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={this.handleAddTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onDeleteTask={this.handleDeleteTask}
            onTaskCompleted={this.handleTaskCompleted}
            clickOnInput={this.clickOnInput}
            onEditTask={this.handleEditTask}
            createdAt={new Date()}
            minutes={this.state.minutes}
            seconds={this.state.seconds}
            startTimer={this.startTimer}
            pauseTimer={this.pauseTimer}
          />
          <Footer
            filter={this.state.filter}
            onClearCompletedTasks={this.handleClearCompletedTasks}
            onFilterTasks={this.handleFilterTasks}
            countIncompleteTasks={this.countIncompleteTasks}
          />
        </section>
      </section>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
