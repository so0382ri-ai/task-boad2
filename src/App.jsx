import { useMemo, useState } from 'react'
import './App.css'

const initialTasks = [
  { id: 1, text: 'Review project brief', completed: false },
  { id: 2, text: 'Prepare weekly task summary', completed: true },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [taskInput, setTaskInput] = useState('')

  const remainingTasks = useMemo(
    () => tasks.filter((task) => !task.completed).length,
    [tasks],
  )

  const handleAddTask = (event) => {
    event.preventDefault()

    const trimmedText = taskInput.trim()
    if (!trimmedText) {
      return
    }

    setTasks((currentTasks) => [
      {
        id: Date.now() + Math.random(),
        text: trimmedText,
        completed: false,
      },
      ...currentTasks,
    ])
    setTaskInput('')
  }

  const handleToggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const handleDeleteTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }

  return (
    <main className="app-shell">
      <div className="task-board">
        <header className="task-board__header">
          <div>
            <p className="eyebrow">Work list</p>
            <h1>Task Board</h1>
          </div>
          <span className="task-count">{remainingTasks} remaining</span>
        </header>

        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            value={taskInput}
            onChange={(event) => setTaskInput(event.target.value)}
            placeholder="Add a task..."
            aria-label="Add a task"
          />
          <button type="submit">Add</button>
        </form>

        <ul className="task-list">
          {tasks.length === 0 ? (
            <li className="empty-state">No tasks yet. Add one above.</li>
          ) : (
            tasks.map((task) => (
              <li
                key={task.id}
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                  />
                  <span>{task.text}</span>
                </label>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDeleteTask(task.id)}
                  aria-label={`Delete ${task.text}`}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  )
}

export default App
