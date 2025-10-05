"use client"

import { useState } from "react"
import { Todo } from "@/lib/api"

interface TodoActionsProps {
  todo: Todo
}

export default function TodoActions({ todo }: TodoActionsProps) {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [status, setStatus] = useState(todo.completed)

  const handleSave = () => {
    if (!title.trim()) return
    console.log("✅ Todo updated:", { ...todo, title, completed: status })
    setEditMode(false)
    // Here you could call an API to update the todo on the server
  }

  const handleDelete = () => {
    console.log("🗑️ Todo deleted:", todo.id)
    alert(`Todo with ID ${todo.id} deleted!`)
    // Call API to delete todo from the backend if needed
  }

  return (
    <div className="mt-6">
      {!editMode ? (
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setEditMode(true)}
            className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Edit todo title"
          />
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={status}
              onChange={() => setStatus(!status)}
              id="completed"
              className="w-5 h-5"
            />
            <label htmlFor="completed" className="text-gray-700">
              Mark as Completed
            </label>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
