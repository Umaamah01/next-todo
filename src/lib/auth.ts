// src/lib/auth.ts

// Save token
export function setAuthToken(token: string) {
  localStorage.setItem("authToken", token);
}

// Get token
export function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

// Remove token (logout)
export function removeAuthToken() {
  localStorage.removeItem("authToken");
}

// Login API
export async function loginUser(email: string, password: string) {
  const res = await fetch("https://api.oluwasetemi.dev/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.message || `Login failed: ${res.status}`);
  if (data.token) setAuthToken(data.token);

  return data;
}

// Register API
export async function registerUser(name: string, email: string, password: string) {
  const res = await fetch("https://api.oluwasetemi.dev/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.error?.message || `Registration failed: ${res.status}`);
  return data;
}
