// app/login/page.tsx
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Example logic – replace with real authentication
    if (email === 'admin@example.com' && password === 'password') {
      router.push('/dashboard') // Replace with your dashboard route
    } else {
      alert('Invalid email or password')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">Login to Your Account</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg  bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium  text-zinc-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border bg-zinc-300 border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-300 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-300 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
