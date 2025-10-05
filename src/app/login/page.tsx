"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  // Form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("https://api.oluwasetemi.dev/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Save the token (if provided)
      if (data.token) {
        localStorage.setItem("auth_token", data.token)
      }

      // Redirect to todos page
      router.push("/todos")
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">Login</h1>

        {error && (
          <p className="mb-4 text-red-600 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300 text-gray-800 placeholder:text-gray-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300 text-gray-800 placeholder:text-gray-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-green-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </main>
  )
}
