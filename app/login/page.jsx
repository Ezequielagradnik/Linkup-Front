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
import { motion } from "framer-motion"

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
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("Login successful:", data)
        if (data.token) {
          await login(data.token)
          toast({
            title: "Login Successful",
            description: "Welcome back!",
          })
          router.push("/dashboard")
        } else {
          throw new Error("No token received from server")
        }
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
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-50/50 via-white to-secondary-50/50"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="h-[500px] w-[500px] rounded-full bg-secondary-500/5 blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl">
          <CardHeader className="space-y-1 pb-8">
            <div className="flex items-center justify-center mb-6">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-16 h-16 relative"
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LINKUP-removebg-preview-H4uudgwmEMqvfk5xeTIBJIgVNGQTC1.png"
                  alt="LinkUp Logo"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-secondary-500/10 blur-xl rounded-full -z-10"></div>
              </motion.div>
            </div>
            <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-secondary-600 to-secondary-800">
              {t.title}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">{t.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  {t.emailLabel}
                </Label>
                <div className="relative group">
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 px-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200 transition-all duration-300 hover:border-gray-300"
                  />
                  <div className="absolute inset-0 rounded-xl bg-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    {t.passwordLabel}
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-secondary-600 hover:text-secondary-700 transition-colors"
                  >
                    {t.forgotPassword}
                  </Link>
                </div>
                <div className="relative group">
                  <Input
                    id="password"
                    type="password"
                    placeholder={t.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 px-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200 transition-all duration-300 hover:border-gray-300"
                  />
                  <div className="absolute inset-0 rounded-xl bg-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)] disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{t.signingIn}</span>
                  </div>
                ) : (
                  t.signIn
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

