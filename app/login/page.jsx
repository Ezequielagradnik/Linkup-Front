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
import { LogIn } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Welcome back",
      description: "Enter your email and password to access your account",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      forgotPassword: "Forgot password?",
      signIn: "Sign in",
      signingIn: "Signing in...",
      noAccount: "Don't have an account?",
      createAccount: "Create an account",
      loginFailed: "Login failed. Please check your credentials.",
    },
    es: {
      title: "Bienvenido de nuevo",
      description: "Ingresa tu email y contraseña para acceder a tu cuenta",
      emailLabel: "Email",
      emailPlaceholder: "Ingresa tu email",
      passwordLabel: "Contraseña",
      passwordPlaceholder: "Ingresa tu contraseña",
      forgotPassword: "¿Olvidaste tu contraseña?",
      signIn: "Iniciar sesión",
      signingIn: "Iniciando sesión...",
      noAccount: "¿No tienes una cuenta?",
      createAccount: "Crear una cuenta",
      loginFailed: "Error al iniciar sesión. Por favor verifica tus credenciales.",
    },
  }

  const t = content[language]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const success = await login(email, password)
      if (success) {
        router.push("/")
      } else {
        alert(t.loginFailed)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-secondary-100 p-3 rounded-full">
              <LogIn className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">{t.title}</CardTitle>
          <CardDescription className="text-center">{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.emailLabel}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t.passwordLabel}</Label>
                <Link href="#" className="text-sm text-secondary-600 hover:text-secondary-700">
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
                className="h-11"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-secondary-500 hover:bg-secondary-600 text-white transition-all duration-300"
              disabled={loading}
            >
              {loading ? t.signingIn : t.signIn}
            </Button>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                {t.noAccount}{" "}
                <Link href="/register" className="text-secondary-600 hover:text-secondary-700 font-medium">
                  {t.createAccount}
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

