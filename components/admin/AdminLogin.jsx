'use client'

import { useState } from 'react'

export default function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simple authentication (in production, use proper auth)
    if (credentials.username === 'admin' && credentials.password === 'dawnhd2025') {
      setTimeout(() => {
        onLogin(true)
        setIsLoading(false)
      }, 1000)
    } else {
      setTimeout(() => {
        setError('Invalid credentials')
        setIsLoading(false)
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="bg-dark-lighter p-8 rounded-lg shadow-2xl w-full max-w-md border border-gold/20">
        <div className="text-center mb-8">
          <h1 className="font-montserrat text-3xl font-bold text-gold mb-2">
            DAWN HD STUDIO
          </h1>
          <p className="text-gray-400">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full px-4 py-3 bg-dark border border-gray-700 rounded focus:border-gold focus:outline-none transition-all duration-300"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full px-4 py-3 bg-dark border border-gray-700 rounded focus:border-gold focus:outline-none transition-all duration-300"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold hover:bg-gold-dark text-white py-3 rounded font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Demo Credentials:</p>
          <p>Username: admin | Password: dawnhd2025</p>
        </div>
      </div>
    </div>
  )
}