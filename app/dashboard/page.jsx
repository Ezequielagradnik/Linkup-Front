"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bell, Book, MessageCircle, Users, FileText, Award, ExternalLink } from "lucide-react"
import Link from "next/link"
import ModuleDetails from "@/components/ModuleDetails"

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
      graduation: {
        title: "Graduation",
        description: "Complete all modules and get your LinkUp diploma.",
        button: "Graduation Form",
      },
      postGraduation: {
        title: "Post-Graduation",
        description: "Explore post-graduation options and join Vefy.",
        button: "Post-Graduation Options",
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
      graduation: {
        title: "Graduación",
        description: "Completa todos los módulos y obtén tu diploma de LinkUp.",
        button: "Formulario de Graduación",
      },
      postGraduation: {
        title: "Post-Graduación",
        description: "Explora las opciones post-graduación y únete a Vefy.",
        button: "Opciones Post-Graduación",
      },
    },
  }

  const t = content[language]

  const fetchDashboardData = async () => {
    try {
      // Mock data - replace with actual API call in production
      const mockData = {
        user: {
          name: "Ezequiel",
          currentModule: 1,
          progress: 10,
        },
        modules: [
          { id: 1, title: "Introduction", completed: true },
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
  }

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
  }, [user, loading, router, refreshToken, isTokenExpired, fetchDashboardData]) // Added fetchDashboardData to dependencies

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
    <div className="min-h-screen bg-background pt-16 pb-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {showInitialForm && (
          <Card className="mb-8 max-w-2xl mx-auto">
            <CardHeader className="text-center space-y-2">
              <div className="flex justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LINKUP-removebg-preview-H4uudgwmEMqvfk5xeTIBJIgVNGQTC1.png"
                  alt="LinkUp Logo"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain"
                />
              </div>
              <CardTitle className="text-2xl md:text-3xl">{t.welcome}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-sm md:text-base">{t.formDescription}</p>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all w-full md:w-auto"
              >
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScWRQPDp4d46zpURjyL2TovoE81Ypw3eJ9n23c_wfgL50DRLw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                  onClick={() => setShowInitialForm(false)}
                >
                  <FileText className="w-5 h-5" />
                  {t.formButton}
                </a>
              </Button>
            </CardContent>
          </Card>
        )}

        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {t.welcomeBack}, {dashboardData.user.name}
        </h1>

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
              className="mt-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all w-full md:w-auto"
              asChild
            >
              <Link href={`/modules/${dashboardData.user.currentModule}`}>{t.progress.button}</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Bell className="mr-2 h-5 w-5" /> {t.quickActions.notifications.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base mb-4">{t.quickActions.notifications.description}</p>
              <Button
                variant="outline"
                className="w-full md:w-auto rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                asChild
              >
                <Link href="/notifications">{t.quickActions.notifications.button}</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MessageCircle className="mr-2 h-5 w-5" /> {t.quickActions.contact.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base mb-4">{t.quickActions.contact.description}</p>
              <Button
                variant="outline"
                className="w-full md:w-auto rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                asChild
              >
                <Link href="/contact">{t.quickActions.contact.button}</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5" /> {t.quickActions.community.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base mb-4">{t.quickActions.community.description}</p>
              <Button
                variant="outline"
                className="w-full md:w-auto rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                asChild
              >
                <Link href="/community">{t.quickActions.community.button}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Book className="mr-2 h-5 w-5" /> {t.mainActions.guide.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base mb-4">{t.mainActions.guide.description}</p>
              <Button
                className="w-full md:w-auto rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
                asChild
              >
                <Link href="/guide">{t.mainActions.guide.button}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Modules Overview */}
        <ModuleDetails modules={dashboardData.modules} currentModule={dashboardData.user.currentModule} />

        {/* Graduation and Post-Graduation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Award className="mr-2 h-5 w-5" /> {t.graduation.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base mb-4">{t.graduation.description}</p>
              <Button
                className="w-full md:w-auto rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all disabled:opacity-50"
                disabled={dashboardData.user.progress < 100}
                asChild
              >
                <Link href="/graduation">{t.graduation.button}</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <ExternalLink className="mr-2 h-5 w-5" /> {t.postGraduation.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base mb-4">{t.postGraduation.description}</p>
              <Button
                className="w-full md:w-auto rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all disabled:opacity-50"
                disabled={dashboardData.user.progress < 100}
                asChild
              >
                <Link href="/post-graduation">{t.postGraduation.button}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

