import { useState } from "react"
import { useTodo } from "../Contexts"

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const { deleteTodo, updateTodo, toggleComplete } = useTodo()

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg })
    setIsTodoEditable(false)
  }

  const toggle = () => {
    toggleComplete(todo.id)
  }

  return (
    <div
      className={`group flex items-center rounded-lg px-4 py-3 gap-3 transition-all duration-300 ${
        todo.isCompleted
          ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
          : "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30"
      }`}
    >
      <button
        onClick={toggle}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          todo.isCompleted
            ? "border-green-500 bg-green-500/20 text-green-500"
            : "border-indigo-400 bg-indigo-500/10 text-transparent hover:bg-indigo-500/20"
        }`}
      >
        {todo.isCompleted && <span>✓</span>}
      </button>

      <input
        type="text"
        className={`w-full bg-transparent outline-none transition-all duration-300 ${
          isTodoEditable ? "border-b-2 border-white/30 px-1 py-0.5 focus:border-white" : "border-transparent"
        } ${todo.isCompleted ? "text-white/50 line-through" : "text-white"}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      <div className="flex gap-1 ml-auto">
        {!todo.isCompleted && (
          <button
            className={`p-1.5 rounded-lg transition-all duration-300 ${
              isTodoEditable
                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                : "bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30"
            }`}
            onClick={() => {
              if (isTodoEditable) {
                editTodo()
              } else {
                setIsTodoEditable(true)
              }
            }}
            title={isTodoEditable ? "Save" : "Edit"}
          >
            {isTodoEditable ? "📁" : "✏️"}
          </button>
        )}

        <button
          className="p-1.5 rounded-lg bg-red-500/20 text-red-400 transition-all duration-300 hover:bg-red-500/30"
          onClick={() => deleteTodo(todo.id)}
          title="Delete"
        >
          ❌
        </button>
      </div>
    </div>
  )
}

export default TodoItem

