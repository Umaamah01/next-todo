// 🟩 Todo type
export interface Todo {
  id: number
  title: string
  completed: boolean
  created_at?: string   // optional, if you want to store creation date
}

// 🟩 Fetch all todos
export async function fetchTodos(): Promise<Todo[]> {
  try {
    const res = await fetch("https://api.oluwasetemi.dev/tasks", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}

// 🟩 Create a new todo
export async function createTodo(title: string): Promise<Todo> {
  try {
    const res = await fetch("https://api.oluwasetemi.dev/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
}

// 🟩 Update todo completion status
export async function updateTodoStatus(id: number, completed: boolean): Promise<Todo> {
  try {
    const res = await fetch(`https://api.oluwasetemi.dev/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
}

// 🟩 Optional: Delete a todo
export async function deleteTodo(id: number): Promise<void> {
  try {
    const res = await fetch(`https://api.oluwasetemi.dev/tasks/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
}
