"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const { language } = useLanguage()
  const { toast } = useToast()

  const content = {
    en: {
      title: "Welcome back",
      description: "Enter your email and password to access your account",
      emailLabel: "Email",
      emailPlaceholder: "name@company.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      forgotPassword: "Forgot password?",
      signIn: "Sign in",
      signingIn: "Signing in...",
      loginFailed: "Login failed. Please check your credentials.",
      loginError: "An error occurred during login. Please try again.",
    },
    es: {
      title: "Bienvenido de nuevo",
      description: "Ingresa tu email y contraseña para acceder a tu cuenta",
      emailLabel: "Email",
      emailPlaceholder: "nombre@empresa.com",
      passwordLabel: "Contraseña",
      passwordPlaceholder: "••••••••",
      forgotPassword: "¿Olvidaste tu contraseña?",
      signIn: "Iniciar sesión",
      signingIn: "Iniciando sesión...",
      loginFailed: "Error al iniciar sesión. Por favor verifica tus credenciales.",
      loginError: "Ocurrió un error durante el inicio de sesión. Por favor, intenta de nuevo.",
    },
  }

  const t = content[language]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log("Login attempt initiated")

    try {
      let loginEndpoint = "/api/login"
      if (email === "linkup.startups@gmail.com") {
        loginEndpoint = "/api/admin/login"
      }

      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("Login successful:", data)
        await login(data.token, email === "linkup.startups@gmail.com")

        toast({
          title: "Login Successful",
          description: "Welcome back!",
        })

        router.push("/dashboard")
      } else {
        console.error("Login error:", data)
        toast({
          title: t.loginFailed,
          description: data.error || "Please check your credentials and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: t.loginError,
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LINKUP-removebg-preview-H4uudgwmEMqvfk5xeTIBJIgVNGQTC1.png"
                alt="LinkUp Logo"
                className="w-full h-full"
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">{t.title}</CardTitle>
          <CardDescription className="text-center">{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                {t.emailLabel}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 px-4 border-[2.5px] border-gray-300 rounded-lg focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200 transition-all duration-200 hover:border-gray-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  {t.passwordLabel}
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-secondary-600 hover:text-secondary-700 transition-colors"
                >
                  {t.forgotPassword}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder={t.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 px-4 border-[2.5px] border-gray-300 rounded-lg focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200 transition-all duration-200 hover:border-gray-400"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 mt-6 bg-secondary-500 hover:bg-secondary-600 text-white transition-all duration-300 rounded-lg text-base font-semibold shadow-[0_4px_14px_0_rgb(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)] border-2 border-secondary-500"
              disabled={loading}
            >
              {loading ? t.signingIn : t.signIn}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

