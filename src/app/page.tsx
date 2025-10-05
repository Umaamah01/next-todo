"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Welcome to Todo App
      </h1>

      <div className="flex flex-col md:flex-row gap-4">
        <Link
          href="/register"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
