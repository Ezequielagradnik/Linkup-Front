"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { motion } from "framer-motion"

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
      emailPlaceholder: "name@company.com",
      resetButton: "Send Reset Link",
      sending: "Sending...",
      backToLogin: "Back to login",
      successMessage: "If an account exists for this email, you will receive a password reset link.",
    },
    es: {
      title: "Olvidaste tu Contraseña",
      description: "Ingresa tu dirección de email y te enviaremos un link para restablecer tu contraseña.",
      emailLabel: "Email",
      emailPlaceholder: "nombre@empresa.com",
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
          <CardHeader className="space-y-1 pb-6">
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
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-secondary-600 to-secondary-800 mb-2">
              {t.title}
            </CardTitle>
            <CardDescription className="text-center text-gray-600 max-w-sm mx-auto">{t.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
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
                <div className="space-y-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)] disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>{t.sending}</span>
                      </div>
                    ) : (
                      t.resetButton
                    )}
                  </Button>
                  <div className="flex justify-center">
                    <Button
                      asChild
                      variant="ghost"
                      className="text-sm font-medium text-secondary-600 hover:text-secondary-700 transition-colors"
                    >
                      <Link href="/login">{t.backToLogin}</Link>
                    </Button>
                  </div>
                </div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                <div className="bg-secondary-50 rounded-xl p-6 border border-secondary-100">
                  <p className="text-gray-600">{t.successMessage}</p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full h-12 border-2 border-gray-200 hover:border-secondary-500 hover:bg-secondary-50 rounded-xl transition-all duration-300 font-medium"
                >
                  <Link href="/login">{t.backToLogin}</Link>
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

