import { fetchTodos, Todo } from "@/lib/api"
import TodoActions from "./TodoActions"
import Link from "next/link"

interface TodoPageProps {
  params: Promise<{ id: string }>  // ✅ params is a plain object
}

export default async function TodoDetailsPage({ params }: TodoPageProps) {
  const { id } = await params   // ✅ no await needed

  const todos = await fetchTodos()
  const todo = todos.find((t: Todo) => t.id === Number(id))

  if (!todo) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-red-600 text-center">
          Todo not found!
        </h1>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Todo Details
      </h1>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg">
        <p className="text-gray-800 text-lg">
          <strong className="font-semibold">ID:</strong> {todo.id}
        </p>
        <p className="text-gray-800 text-lg mt-3">
          <strong className="font-semibold">Title:</strong> {todo.title}
        </p>
        <p
          className={`text-lg mt-3 font-semibold ${
            todo.completed ? "text-green-600" : "text-red-600"
          }`}
        >
          <strong className="font-semibold">Status:</strong>{" "}
          {todo.completed ? "Completed ✔" : "Not Completed ✖"}
        </p>

        <TodoActions todo={todo} />
      </div>

      <div className="text-center mt-6">
        <Link
          href="/todos"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Back to Todos
        </Link>
      </div>
    </main>
  )
}
