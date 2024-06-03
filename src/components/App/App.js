import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Check mail', completed: false, editing: false, isRunning: false, currentTime: 0 },
    { id: 2, text: 'Drink coffee', completed: false, editing: false, isRunning: false, currentTime: 0 },
    { id: 3, text: 'Buy a cake', completed: false, editing: false, isRunning: false, currentTime: 0 },
  ])
  const [filter, setFilter] = useState('all')
  const [minutes] = useState('')
  const [seconds] = useState('')
  const [, setCurrentTime] = useState(0)
  const [timerIds, setTimerIds] = useState({})

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTasks = tasks.map((task) => {
        if (task.isRunning && task.currentTime > 0) {
          return { ...task, currentTime: task.currentTime - 1 }
        } else if (task.isRunning && task.currentTime === 0) {
          clearInterval(timerIds[task.id])
          return { ...task, isRunning: false }
        }
        return task
      })
      setTasks(updatedTasks)
    }, 1000)

    return () => clearInterval(interval)
  }, [tasks, timerIds])

  useEffect(() => {
    setCurrentTime(tasks.currentTime)
  }, [tasks])

  // Изменение значения свойства у элемента
  const handleTaskCompleted = (id, completed) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, completed } : task)))
  }

  // Добавление задач
  const handleAddTask = (newTask, minutes, seconds) => {
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

    setTasks((prevTasks) => [...prevTasks, createdTask])
  }

  //Таймер
  const startTimer = (taskId) => {
    clearInterval(timerIds[taskId])
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, currentTime: task.currentTime - 1 }
        }
        return task
      })
      return updatedTasks
    })

    const timerId = setInterval(() => {
      updateTimer(taskId)
    }, 1000)

    setTimerIds((prevTimerIds) => ({
      ...prevTimerIds,
      [taskId]: timerId,
    }))
  }

  const updateTimer = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId && task.currentTime > 0) {
          return { ...task, currentTime: task.currentTime - 1 }
        } else if (task.id === taskId && task.currentTime === 0) {
          clearInterval(timerIds[taskId])
          return { ...task, isRunning: false }
        }
        return task
      })
      updateTaskState(updatedTasks, taskId)
      return updatedTasks
    })
  }

  const pauseTimer = (taskId) => {
    clearInterval(timerIds[taskId])
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isRunning: false }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const updateTaskState = (updatedTasks, taskId) => {
    const taskToUpdate = updatedTasks.find((task) => task.id === taskId)
    if (taskToUpdate) {
      setTasks(updatedTasks)
    } else {
      console.error(`Task with ID ${taskId} not found.`)
    }
  }

  // Удаление задач
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  // Удаление всех выполненных задач
  const handleClearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed))
  }

  // Фильтрация по кнопкам
  const handleFilterTasks = (filter) => {
    setFilter(filter)
  }

  const filterTasks = (tasks, filter) => {
    if (filter === 'active') {
      return tasks.filter((task) => !task.completed)
    } else if (filter === 'completed') {
      return tasks.filter((task) => task.completed)
    } else {
      return tasks
    }
  }

  // Состояние задач
  const clickOnInput = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  // Подсчет активных задач
  const countIncompleteTasks = () => {
    return tasks.filter((task) => !task.completed).length
  }

  // Редактирование задач
  const handleEditTask = (id, newText) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, text: newText } : task)))
  }

  const filteredTasks = filterTasks(tasks, filter)

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={handleAddTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onDeleteTask={handleDeleteTask}
          onTaskCompleted={handleTaskCompleted}
          clickOnInput={clickOnInput}
          onEditTask={handleEditTask}
          createdAt={new Date()}
          minutes={minutes}
          seconds={seconds}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
        />
        <Footer
          filter={filter}
          onClearCompletedTasks={handleClearCompletedTasks}
          onFilterTasks={handleFilterTasks}
          countIncompleteTasks={countIncompleteTasks}
        />
      </section>
    </section>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App
