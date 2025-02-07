"use client"

import { createContext, useContext, useState, useEffect } from "react"
import jwt_decode from "jwt-decode"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const isAdmin = localStorage.getItem("isAdmin") === "true"
    if (token) {
      setUser({ token, isAdmin })
    }
    setLoading(false)
  }, [])

  const login = async (token) => {
    try {
      const decodedToken = jwt_decode(token)
      const isAdmin = decodedToken.isAdmin || false
      localStorage.setItem("token", token)
      localStorage.setItem("isAdmin", isAdmin)
      setUser({ token, isAdmin })
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

