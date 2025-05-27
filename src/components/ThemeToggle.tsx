'use client'
import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')


  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light' 
    setTheme(newTheme) 
    document.documentElement.classList.toggle('dark', newTheme === 'dark') 
    localStorage.setItem('theme', newTheme) 
  }


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) {
      setTheme(savedTheme) 
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
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
