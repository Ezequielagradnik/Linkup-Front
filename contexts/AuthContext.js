"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

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
      if (typeof token !== "string" || token.trim() === "") {
        throw new Error("Invalid token: Token must be a non-empty string")
      }
      const decodedToken = jwtDecode(token)
      const isAdmin = decodedToken.isAdmin || false
      localStorage.setItem("token", token)
      localStorage.setItem("isAdmin", isAdmin.toString())
      setUser({ token, isAdmin })
      return true
    } catch (error) {
      console.error("Error logging in:", error)
      localStorage.removeItem("token")
      localStorage.removeItem("isAdmin")
      setUser(null)
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

