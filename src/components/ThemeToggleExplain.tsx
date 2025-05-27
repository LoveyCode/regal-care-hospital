'use client'
import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
  // This state keeps track of the current theme: 'light' or 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // This function runs when the user clicks the toggle button
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light' // Switch theme
    setTheme(newTheme) // Update state
    document.documentElement.classList.toggle('dark', newTheme === 'dark') // Add/remove dark class on <html>
    localStorage.setItem('theme', newTheme) // Save selected theme in localStorage
  }

  // This effect runs once when the component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' // Retrieve theme if saved
    if (savedTheme) {
      setTheme(savedTheme) // Set state to saved theme
      document.documentElement.classList.toggle('dark', savedTheme === 'dark') // Apply class
    }
  }, [])

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white rounded"
    >
      Toggle Theme
    </button>
  )
}

export default ThemeToggle
