"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Forgot Password",
      description: "Enter your email address and we'll send you a link to reset your password.",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      resetButton: "Send Reset Link",
      sending: "Sending...",
      backToLogin: "Back to login",
      successMessage: "If an account exists for this email, you will receive a password reset link.",
    },
    es: {
      title: "Olvidaste tu Contraseña",
      description: "Ingresa tu dirección de email y te enviaremos un link para restablecer tu contraseña.",
      emailLabel: "Email",
      emailPlaceholder: "Ingresa tu email",
      resetButton: "Enviar Link de Restablecimiento",
      sending: "Enviando...",
      backToLogin: "Volver al inicio de sesión",
      successMessage: "Si existe una cuenta con este email, recibirás un link para restablecer tu contraseña.",
    },
  }

  const t = content[language]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitted(true)
    setLoading(false)
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
          {!submitted ? (
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
                  className="h-11 rounded-full"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-secondary-500 hover:bg-secondary-600 text-white transition-all duration-300 rounded-full"
                disabled={loading}
              >
                {loading ? t.sending : t.resetButton}
              </Button>
              <div className="text-center">
                <Link href="/login" className="text-sm text-secondary-600 hover:text-secondary-700">
                  {t.backToLogin}
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">{t.successMessage}</p>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/login">{t.backToLogin}</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

