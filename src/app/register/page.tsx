"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { registerUser } from "@/lib/auth"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter();

  // Handle form submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const response = await registerUser(name, email, password)
      console.log("Registration response:", response)

      setSuccess("Registration successful! Redirecting to login....");
      setName("")
      setEmail("")
      setPassword("")
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      setError(err.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">Register</h1>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        {success && <p className="text-green-600 text-center mb-3">{success}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
  {/* Name Field */}
  <div>
    <label className="block text-gray-700 mb-1">Name</label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
      placeholder="Enter your name"
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300 text-gray-800 placeholder:text-gray-500"
    />
  </div>
      <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                console.log("Typed email:", e.target.value)
                setEmail(e.target.value)
              }}
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300 text-gray-800 placeholder:text-gray-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                console.log("Typed password:", e.target.value)
                setPassword(e.target.value)}}
              required
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300 text-gray-800 placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
          
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </main>
  )
}
