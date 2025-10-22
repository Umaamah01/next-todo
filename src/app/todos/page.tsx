"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {createTodo, updateTodoStatus, Todo } from "@/lib/api"
import { Search } from "lucide-react"

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [hasNextPage, setHasNextPage] = useState(false)
  const [newTodo, setNewTodo] = useState("")        // 🆕 For new task
  const [creating, setCreating] = useState(false)  // 🆕 Loading state for create

  const loadTodos = async (page = currentPage) => {
    try {
      setLoading(true)
      setError("")
      const res = await fetch(`https://api.oluwasetemi.dev/tasks?page=${page}&limit=10`)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

      const response = await res.json()
      const tasks = response.data || []
      setHasNextPage(response.meta?.hasNextPage || false)

      setTodos(
        tasks.map((task: Record<string, unknown>) => ({
          id: task.id,
          title: task.title || task.name,
          completed: task.completed ?? false,
          created_at: task.created_at || "",
        }))
      )
    } catch (err) {
      setError("Failed to load todos.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTodos()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  // 🔥 Handle new todo submission
  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      setCreating(true)
      await createTodo(newTodo)
      setNewTodo("")           // Clear input
      await loadTodos()        // Refresh list after adding
    } catch {
      alert("Failed to create todo")
    } finally {
      setCreating(false)
    }
  }

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <p className="p-6 text-center text-gray-700">Loading todos...</p>
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-md">
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">Todos</h1>

        {/* 🆕 Create Todo Form */}
        <form onSubmit={handleCreateTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-300 placeholder:text-gray-700"
          />
          <button
            type="submit"
            disabled={creating}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {creating ? "Adding..." : "Add"}
          </button>
        </form>

        {/* 🔍 Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search todos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-300 placeholder:text-gray-700"
          />
        </div>

        {/* Todo List */}
        <ul className="space-y-3 mb-6">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100 transition"
            >
            <input
            type="checkbox"
            checked={todo.completed}
            onChange={async () => {
              try {
                const updated = !todo.completed
                await updateTodoStatus(todo.id, updated)
                setTodos((prev) =>
                  prev.map((t) => (t.id === todo.id ? { ...t, completed: updated } : t))
                )
              } catch {
                alert("Failed to update todo")
              }
            }}
            className="w-4 h-4 accent-green-600 cursor-pointer"
          />

              <Link
                href={`/todos/${todo.id}`}
                className={`flex-1 ${todo.completed ? "line-through text-gray-500" : "text-gray-800"} hover:underline`}
              >
                {todo.title}
              </Link>
            </li>
          ))}
          {filteredTodos.length === 0 && <p className="text-center text-gray-500">No todos found.</p>}
        </ul>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700 font-medium">Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => (hasNextPage ? prev + 1 : prev))}
            disabled={!hasNextPage}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  )
}
