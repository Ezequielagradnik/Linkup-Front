"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bell, Book, MessageCircle, Users, FileText, ArrowRight, Rocket, Target, Award } from 'lucide-react'

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
    <div className="min-h-screen bg-[#f8fafc] pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4">
        {showInitialForm ? (
          <div className="max-w-2xl mx-auto mb-12">
            <Card className="overflow-hidden rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  {/* Subtle animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white animate-gradient" />
                  
                  <div className="relative p-8 md:p-10 flex flex-col items-center text-center">
                    {/* Logo with subtle floating animation */}
                    <div className="mb-8 relative group">
                      <div className="absolute inset-0 bg-blue-100/50 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LINKUP-removebg-preview-H4uudgwmEMqvfk5xeTIBJIgVNGQTC1.png"
                        alt="LinkUp Logo"
                        className="w-28 h-28 object-contain relative animate-float"
                      />
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                      {t.welcome}
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-xl">
                      {t.formDescription}
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 
                               hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transform hover:scale-105"
                    >
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScWRQPDp4d46zpURjyL2TovoE81Ypw3eJ9n23c_wfgL50DRLw/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-8 py-3"
                        onClick={() => setShowInitialForm(false)}
                      >
                        <FileText className="w-5 h-5" />
                        <span className="text-lg">{t.formButton}</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {t.welcomeBack}, {dashboardData.user.name}
            </h1>
            <p className="text-xl text-gray-600">Continúa tu viaje emprendedor</p>
          </div>
        )}

     {/* Progress Overview - Now more prominent */}
     <div className="max-w-3xl mx-auto mb-16">
          <Card className="rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl flex items-center gap-3">
                <Target className="h-6 w-6 text-blue-600" />
                {t.progress.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Progress value={dashboardData.user.progress} className="h-3 rounded-full" />
                  <p className="text-sm text-gray-600">
                    {dashboardData.user.progress}% {t.progress.completed}
                  </p>
                </div>
                <Button
                  className="w-full sm:w-auto rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300
                           hover:shadow-lg transform hover:scale-[1.02] text-lg py-6 px-8"
                  onClick={() => handleNavigation(`/module${dashboardData.user.currentModule}`)}
                >
                  {t.progress.button}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Bell className="mr-2 h-5 w-5 text-blue-600" />
                {t.quickActions.notifications.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{t.quickActions.notifications.description}</p>
              <Button
                variant="outline"
                className="w-full rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => handleNavigation("/mentor-ia")}
              >
                {t.quickActions.notifications.button}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MessageCircle className="mr-2 h-5 w-5 text-blue-600" />
                {t.quickActions.contact.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{t.quickActions.contact.description}</p>
              <Button
                variant="outline"
                className="w-full rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => handleNavigation("/contact")}
              >
                {t.quickActions.contact.button}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                {t.quickActions.community.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{t.quickActions.community.description}</p>
              <Button
                variant="outline"
                className="w-full rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => handleNavigation("/community")}
              >
                {t.quickActions.community.button}
              </Button>
            </CardContent>
          </Card>
        </div>
{/* Modules Overview - Improved design */}
<div className="pb-12">
          <h2 className="text-3xl font-bold text-center mb-12">{t.modules.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dashboardData.modules.map((module) => (
              <div
                key={module.id}
                className="group relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300
                         hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100"
                onClick={() => handleNavigation(`/module${module.id}`)}
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-gray-900">
                      {language === "en" ? "Module" : "Módulo"} {module.id}
                    </span>
                    {module.completed && (
                      <span className="text-green-500 bg-green-50 p-1 rounded-full">
                        <CheckCircle2 className="h-5 w-5" />
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{module.title}</p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <span className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    {t.modules.startModule}
                    <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-2" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}