import { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'task-board-v1'

const initialTasks = [
  {
    id: 1,
    text: 'プロジェクトの概要を確認',
    completed: false,
    subtasks: [
      { id: 11, text: '要件を整理する', completed: false },
      { id: 12, text: 'スケジュールを確認する', completed: true },
    ],
  },
  {
    id: 2,
    text: '週次レビューを行う',
    completed: true,
    subtasks: [{ id: 21, text: '報告資料を作成する', completed: true }],
  },
]

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY)
    if (!storedTasks) {
      return initialTasks
    }

    try {
      return JSON.parse(storedTasks)
    } catch {
      return initialTasks
    }
  })
  const [taskInput, setTaskInput] = useState('')
  const [openSubtaskInputs, setOpenSubtaskInputs] = useState({})
  const [subtaskDrafts, setSubtaskDrafts] = useState({})

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const remainingTasks = useMemo(
    () => tasks.filter((task) => !task.completed).length,
    [tasks],
  )

  const activeTasks = useMemo(
    () => tasks.filter((task) => !task.completed),
    [tasks],
  )

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed),
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
        subtasks: [],
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

  const handleToggleSubtask = (taskId, subtaskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task
        }

        return {
          ...task,
          subtasks: task.subtasks.map((subtask) =>
            subtask.id === subtaskId
              ? { ...subtask, completed: !subtask.completed }
              : subtask,
          ),
        }
      }),
    )
  }

  const handleDeleteSubtask = (taskId, subtaskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task
        }

        return {
          ...task,
          subtasks: task.subtasks.filter((subtask) => subtask.id !== subtaskId),
        }
      }),
    )
  }

  const handleAddSubtask = (taskId) => {
    const draft = (subtaskDrafts[taskId] || '').trim()
    if (!draft) {
      return
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [
                ...task.subtasks,
                { id: Date.now() + Math.random(), text: draft, completed: false },
              ],
            }
          : task,
      ),
    )

    setSubtaskDrafts((current) => ({ ...current, [taskId]: '' }))
    setOpenSubtaskInputs((current) => ({ ...current, [taskId]: false }))
  }

  const renderTaskItem = (task) => (
    <li
      key={task.id}
      className={`task-item ${task.completed ? 'completed' : ''}`}
    >
      <div className="task-main">
        <label className="task-label">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggleTask(task.id)}
          />
          <span>{task.text}</span>
        </label>

        <div className="subtask-block">
          {task.subtasks.length > 0 && (
            <ul className="subtask-list">
              {task.subtasks.map((subtask) => (
                <li
                  key={subtask.id}
                  className={`subtask-item ${subtask.completed ? 'done' : ''}`}
                >
                  <label className="subtask-label">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => handleToggleSubtask(task.id, subtask.id)}
                    />
                    <span>{subtask.text}</span>
                  </label>
                  <button
                    type="button"
                    className="delete-subtask"
                    onClick={() => handleDeleteSubtask(task.id, subtask.id)}
                    aria-label={`サブタスク「${subtask.text}」を削除`}
                  >
                    削除
                  </button>
                </li>
              ))}
            </ul>
          )}

          {openSubtaskInputs[task.id] ? (
            <div className="subtask-input-row">
              <input
                type="text"
                value={subtaskDrafts[task.id] || ''}
                onChange={(event) =>
                  setSubtaskDrafts((current) => ({
                    ...current,
                    [task.id]: event.target.value,
                  }))
                }
                placeholder="サブタスクを入力..."
                aria-label={`タスク「${task.text}」のサブタスク`}
              />
              <button type="button" onClick={() => handleAddSubtask(task.id)}>
                追加
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="subtask-toggle"
              onClick={() =>
                setOpenSubtaskInputs((current) => ({
                  ...current,
                  [task.id]: true,
                }))
              }
              aria-label={`タスク「${task.text}」にサブタスクを追加`}
            >
              ＋
            </button>
          )}
        </div>
      </div>

      <button
        type="button"
        className="delete-button"
        onClick={() => handleDeleteTask(task.id)}
        aria-label={`${task.text}を削除`}
      >
        削除
      </button>
    </li>
  )

  return (
    <main className="app-shell">
      <div className="task-board">
        <header className="task-board__header">
          <div>
            <p className="eyebrow">作業一覧</p>
            <h1>タスクボード</h1>
          </div>
          <span className="task-count">{remainingTasks} 件残り</span>
        </header>

        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            value={taskInput}
            onChange={(event) => setTaskInput(event.target.value)}
            placeholder="タスクを入力..."
            aria-label="タスクを追加"
          />
          <button type="submit">追加</button>
        </form>

        <section className="task-section">
          <h2>未完了</h2>
          <ul className="task-list">
            {activeTasks.length === 0 ? (
              <li className="empty-state">未完了のタスクはありません。</li>
            ) : (
              activeTasks.map(renderTaskItem)
            )}
          </ul>
        </section>

        <section className="task-section completed-section">
          <h2>完了済み</h2>
          <ul className="task-list">
            {completedTasks.length === 0 ? (
              <li className="empty-state">完了済みのタスクはありません。</li>
            ) : (
              completedTasks.map(renderTaskItem)
            )}
          </ul>
        </section>
      </div>
    </main>
  )
}

export default App
