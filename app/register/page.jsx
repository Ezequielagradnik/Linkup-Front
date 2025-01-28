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
import { UserPlus, Rocket } from "lucide-react"

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Join LinkUp Today",
      description: "Start your entrepreneurial journey with us",
      usernameLabel: "Username",
      usernamePlaceholder: "Choose a username",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Create a password",
      createAccount: "Create account",
      creatingAccount: "Creating account...",
      haveAccount: "Already have an account?",
      signIn: "Sign in",
      benefits: [
        "Access to exclusive startup resources",
        "Connect with mentors and investors",
        "Join our thriving community",
      ],
      registerFailed: "Registration failed. Please try again.",
    },
    es: {
      title: "Únete a LinkUp Hoy",
      description: "Comienza tu viaje emprendedor con nosotros",
      usernameLabel: "Nombre de usuario",
      usernamePlaceholder: "Elige un nombre de usuario",
      emailLabel: "Email",
      emailPlaceholder: "Ingresa tu email",
      passwordLabel: "Contraseña",
      passwordPlaceholder: "Crea una contraseña",
      createAccount: "Crear cuenta",
      creatingAccount: "Creando cuenta...",
      haveAccount: "¿Ya tienes una cuenta?",
      signIn: "Iniciar sesión",
      benefits: [
        "Acceso a recursos exclusivos para startups",
        "Conecta con mentores e inversores",
        "Únete a nuestra próspera comunidad",
      ],
      registerFailed: "Error al registrarse. Por favor intenta de nuevo.",
    },
  }

  const t = content[language]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const success = await register(username, email, password)
      if (success) {
        router.push("/login")
      } else {
        alert(t.registerFailed)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-center">
        {/* Left side - Benefits */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Rocket className="h-8 w-8 text-primary-600" />
            <h2 className="text-3xl font-bold text-primary-900">LinkUp</h2>
          </div>
          <div className="space-y-4">
            {t.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-semibold">{index + 1}</span>
                </div>
                <p className="text-lg text-primary-800">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Register form */}
        <Card className="w-full md:w-1/2">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary-100 p-3 rounded-full">
                <UserPlus className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">{t.title}</CardTitle>
            <CardDescription className="text-center">{t.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{t.usernameLabel}</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder={t.usernamePlaceholder}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
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
                <Label htmlFor="password">{t.passwordLabel}</Label>
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
                className="w-full h-11 bg-primary-900 hover:bg-primary-800 text-white transition-all duration-300"
                disabled={loading}
              >
                {loading ? t.creatingAccount : t.createAccount}
              </Button>
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  {t.haveAccount}{" "}
                  <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                    {t.signIn}
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

