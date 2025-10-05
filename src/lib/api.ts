// 🟩 Fetch all todos
export async function fetchTodos() {
  try {
    const res = await fetch("https://api.oluwasetemi.dev/tasks", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json(); // should be an array of todos
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}

// 🟩 Create a new todo
export async function createTodo(title: string) {
  try {
    const res = await fetch("https://api.oluwasetemi.dev/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json(); // returns the newly created todo
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
}
