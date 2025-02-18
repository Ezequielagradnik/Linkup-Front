"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bell, Book, MessageCircle, Users, FileText, ArrowRight } from "lucide-react"

export default function Dashboard() {
  const { user, loading, refreshToken, isTokenExpired } = useAuth()
  const { language } = useLanguage()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showInitialForm, setShowInitialForm] = useState(true)

  const content = {
    en: {
      loading: "Loading...",
      error: "Error loading dashboard data.",
      noData: "No dashboard data found.",
      welcome: "Welcome to LinkUp",
      formDescription:
        "To begin with the modules, we first need to get to know you better. Please complete our initial analysis form:",
      formButton: "Complete Analysis Form",
      welcomeBack: "Welcome back",
      progress: {
        title: "Your Progress",
        continue: "Continue with Module",
        completed: "completed",
        button: "Continue Learning",
      },
      quickActions: {
        notifications: {
          title: "Notifications",
          description: "You have 0 new messages from the chatbot.",
          button: "View Notifications",
        },
        contact: {
          title: "Contact",
          description: "Need help? Contact us.",
          button: "Contact Us",
        },
        community: {
          title: "Community",
          description: "Join our community of entrepreneurs.",
          button: "Join Community",
        },
      },
      mainActions: {
        guide: {
          title: "Start Guide",
          description: "Begin your entrepreneurial journey with our step-by-step guide.",
          button: "Start Guide",
        },
      },
      modules: {
        title: "Program Modules",
        startModule: "Start Module",
        completed: "Completed",
      },
    },
    es: {
      loading: "Cargando...",
      error: "Error al cargar los datos del dashboard.",
      noData: "No se encontraron datos del dashboard.",
      welcome: "Bienvenido a LinkUp",
      formDescription:
        "Para comenzar con los módulos, primero necesitamos conocerte mejor. Por favor, completa nuestro formulario de análisis inicial:",
      formButton: "Completar Formulario de Análisis",
      welcomeBack: "Bienvenido de vuelta",
      progress: {
        title: "Tu Progreso",
        continue: "Continuar con Módulo",
        completed: "completado",
        button: "Continuar Aprendizaje",
      },
      quickActions: {
        notifications: {
          title: "Notificaciones",
          description: "Tienes 0 nuevos mensajes del chatbot.",
          button: "Ver Notificaciones",
        },
        contact: {
          title: "Contacto",
          description: "¿Necesitas ayuda? Contáctanos.",
          button: "Contactar",
        },
        community: {
          title: "Comunidad",
          description: "Únete a nuestra comunidad de emprendedores.",
          button: "Unirse a la Comunidad",
        },
      },
      mainActions: {
        guide: {
          title: "Iniciar Guía",
          description: "Comienza tu viaje emprendedor con nuestra guía paso a paso.",
          button: "Iniciar Guía",
        },
      },
      modules: {
        title: "Módulos del Programa",
        startModule: "Comenzar Módulo",
        completed: "Completado",
      },
    },
  }

  const t = content[language]

  const fetchDashboardData = useCallback(async () => {
    try {
      // Mock data - replace with actual API call in production
      const mockData = {
        user: {
          name: "Ezequiel",
          currentModule: 1,
          progress: 10,
        },
        modules: [
          { id: 1, title: "INTRODUCCIÓN AL MUNDO DE LAS STARTUPS", completed: false },
          { id: 2, title: "Ideation", completed: false },
          { id: 3, title: "Validation", completed: false },
        ],
      }
      setDashboardData(mockData)
    } catch (err) {
      setError(err)
    } finally {
      setDataLoading(false)
    }
  }, [])

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      if (!loading) {
        if (!user) {
          router.push("/login")
        } else {
          if (isTokenExpired()) {
            const refreshed = await refreshToken()
            if (!refreshed) {
              router.push("/login")
              return
            }
          }
          fetchDashboardData()
        }
      }
    }

    checkAuthAndFetchData()
  }, [user, loading, router, refreshToken, isTokenExpired, fetchDashboardData])

  const handleNavigation = (path) => {
    router.push(path)
  }

  if (loading || dataLoading) {
    return <div className="flex justify-center items-center min-h-screen">{t.loading}</div>
  }

  if (error) {
    console.error("Error loading dashboard data:", error)
    return <div className="text-center text-red-500">{t.error}</div>
  }

  if (!dashboardData) {
    return <div className="text-center">{t.noData}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-16 pb-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {showInitialForm ? (
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50" />
            <div className="relative p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LINKUP-removebg-preview-H4uudgwmEMqvfk5xeTIBJIgVNGQTC1.png"
                    alt="LinkUp Logo"
                    className="w-24 h-24 md:w-32 md:h-32 object-contain"
                  />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                    {t.welcome}
                  </h1>
                  <p className="text-base md:text-lg text-gray-600 mb-6">{t.formDescription}</p>
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
                  >
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLScWRQPDp4d46zpURjyL2TovoE81Ypw3eJ9n23c_wfgL50DRLw/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                      onClick={() => setShowInitialForm(false)}
                    >
                      <FileText className="w-5 h-5" />
                      {t.formButton}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {t.welcomeBack}, {dashboardData.user.name}
          </h1>
        )}

        {/* Start Guide Section */}
        <Card className="mb-8 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Book className="mr-2 h-5 w-5 text-blue-600" />
              {t.mainActions.guide.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{t.mainActions.guide.description}</p>
            <Button
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
              onClick={() => handleNavigation("/guide")}
            >
              {t.mainActions.guide.button}
            </Button>
          </CardContent>
        </Card>

        {/* Module Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t.progress.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base md:text-lg mb-4">
              {t.progress.continue} {dashboardData.user.currentModule}
            </p>
            <Progress value={dashboardData.user.progress} className="w-full" />
            <p className="mt-2 text-sm text-gray-600">
              {dashboardData.user.progress}% {t.progress.completed}
            </p>
            <Button
              className="mt-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
              onClick={() => handleNavigation(`/module${dashboardData.user.currentModule}`)}
            >
              {t.progress.button}
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Bell className="mr-2 h-5 w-5" />
                {t.quickActions.notifications.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{t.quickActions.notifications.description}</p>
              <Button
                variant="outline"
                className="w-full rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                onClick={() => handleNavigation("/mentor-ia")}
              >
                {t.quickActions.notifications.button}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                {t.quickActions.contact.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{t.quickActions.contact.description}</p>
              <Button
                variant="outline"
                className="w-full rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                onClick={() => handleNavigation("/contact")}
              >
                {t.quickActions.contact.button}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5" />
                {t.quickActions.community.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{t.quickActions.community.description}</p>
              <Button
                variant="outline"
                className="w-full rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                onClick={() => handleNavigation("/community")}
              >
                {t.quickActions.community.button}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Modules Overview */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">{t.modules.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.modules.map((module) => (
              <Card
                key={module.id}
                className={`transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                  module.completed ? "border-green-500" : ""
                }`}
                onClick={() => handleNavigation(`/module${module.id}`)}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold">
                    {language === "en" ? "Module" : "Módulo"} {module.id}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{module.title}</p>
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 flex items-center gap-2">
                      {t.modules.startModule}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    {module.completed && <span className="text-green-500 text-sm">✓ {t.modules.completed}</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

