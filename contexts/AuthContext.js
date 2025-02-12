"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const decodedToken = jwtDecode(token)
          const currentTime = Date.now() / 1000

          if (decodedToken.exp && decodedToken.exp > currentTime) {
            const isAdmin = localStorage.getItem("isAdmin") === "true"
            setUser({ token, isAdmin })
          } else {
            // Token has expired
            await logout()
          }
        } catch (error) {
          console.error("Error decoding token:", error)
          await logout()
        }
      }
      setLoading(false)
    }

    initializeAuth()
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
      await logout()
      return false
    }
  }

  const logout = async () => {
    localStorage.removeItem("token")
    localStorage.removeItem("isAdmin")
    setUser(null)
  }

  const refreshToken = async () => {
    try {
      const response = await fetch("/api/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        const { token } = await response.json()
        await login(token)
        return true
      } else {
        throw new Error("Failed to refresh token")
      }
    } catch (error) {
      console.error("Error refreshing token:", error)
      await logout()
      return false
    }
  }

  const isTokenExpired = () => {
    const token = localStorage.getItem("token")
    if (!token) return true

    try {
      const decodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000
      return decodedToken.exp < currentTime
    } catch (error) {
      console.error("Error checking token expiration:", error)
      return true
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshToken, isTokenExpired }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

