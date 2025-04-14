import React, { useState } from 'react'
import { useTodo } from '../Contexts/index'

function TodoForm() {
    const [todo, setTodo] = useState("")
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()
        if (!todo.trim()) return

        addTodo({ todo, isCompleted: false })
        setTodo("")
    }

    return (
        <form onSubmit={add} className="flex group">
            <input
                type="text"
                placeholder="Add a new task..."
                className="w-full px-4 py-3 text-white bg-white/20 rounded-l-lg outline-none transition-all duration-300 placeholder:text-white/50 focus:bg-white/30 focus:ring-2 focus:ring-indigo-300/50"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button 
                type="submit" 
                className="flex items-center justify-center gap-1 px-4 py-3 font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-r-lg transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                disabled={!todo.trim()}
            >
                <span className="text-lg">+</span>
                <span className="hidden sm:inline">Add</span>
            </button>
        </form>
    );
}

export default TodoForm;
