import { useState, useEffect } from "react"
import { TodoProvider } from "./Contexts/TodoContext"
import { TodoForm, TodoItem } from "./Components"

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((items) => items.id !== id))
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((items) => (items.id === id ? todo : items)))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((items) => (items.id === id ? { ...items, isCompleted: !items.isCompleted } : items)))
  }

  // Storing it in local storage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) setTodos(todos)
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}>
      <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
        <div className="w-full max-w-2xl mx-auto overflow-hidden rounded-xl shadow-2xl bg-white/10 backdrop-blur-lg">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-extrabold text-center mb-10 text-white tracking-wide">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-indigo-300">
                Task Master
              </span>
            </h1>

            <div className="mb-6">
              <TodoForm />
            </div>

            {todos.length > 0 ? (
              <div className="space-y-4">
                {todos.map((todo) => (
                  <div key={todo.id} className="w-full transition-all duration-300 hover:translate-x-1">
                    <TodoItem todo={todo} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-white/70 italic">No tasks yet. Add one above!</div>
            )}

            {todos.length > 0 && (
              <div className="mt-6 text-right text-xs text-white/50">
                {todos.filter((t) => t.isCompleted).length} of {todos.length} tasks completed
              </div>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App

