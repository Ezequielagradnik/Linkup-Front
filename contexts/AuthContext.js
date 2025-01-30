"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const isAdmin = localStorage.getItem("isAdmin")
    if (token) {
      setUser({ token, isAdmin: isAdmin === "true" })
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      if (email === "linkup.startups@gmail.com" && password === "cotur2025") {
        // Admin login
        setUser({ email, isAdmin: true })
        localStorage.setItem("token", "admin_token")
        localStorage.setItem("isAdmin", "true")
        return true
      }

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("token", data.token)
        localStorage.setItem("isAdmin", "false")
        setUser({ email, isAdmin: false })
        return true
      }
      return false
    } catch (error) {
      console.error("Error logging in:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("isAdmin")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

