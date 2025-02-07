"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const isAdmin = localStorage.getItem("isAdmin") === "true"
    if (token || isAdmin) {
      setUser(isAdmin ? { isAdmin: true } : { token })
    }
    setLoading(false)
  }, [])

  const login = async (token, isAdmin) => {
    try {
      if (isAdmin) {
        localStorage.setItem("isAdmin", "true")
        setUser({ isAdmin: true })
      } else {
        localStorage.setItem("token", token)
        setUser({ token })
      }
      return true
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

