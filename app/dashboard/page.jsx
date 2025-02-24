"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Bell,
  MessageCircle,
  Users,
  FileText,
  ArrowRight,
  Target,
  Sparkles,
  CheckCircle2,
  ClipboardCheck,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Dashboard() {
  const router = useRouter()
  const { user, loading, refreshToken, isTokenExpired } = useAuth()
  const { toast } = useToast()
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [language, setLanguage] = useState("es")

  const content = {
    en: {
      loading: "Loading...",
      error: "Error loading dashboard data.",
      noData: "No dashboard data found.",
      welcome: "Welcome back",
      formDescription: "To begin your journey, please complete our initial analysis form:",
      formButton: "Complete Analysis Form",
      progress: {
        title: "Your Progress",
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
      modules: {
        title: "Program Modules",
        startModule: "Start Module",
        completed: "Completed",
      },
    },
    es: {
      loading: "Cargando...",
      error: "Error al cargar los datos.",
      noData: "No se encontraron datos.",
      welcome: "Bienvenido de vuelta",
      formDescription: "Para comenzar tu viaje, completa nuestro formulario de análisis inicial:",
      formButton: "Completar Formulario",
      progress: {
        title: "Tu Progreso",
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
      modules: {
        title: "Módulos del Programa",
        startModule: "Comenzar Módulo",
        completed: "Completado",
      },
    },
  }

  const t = content[language]


  const fetchDashboardData = useCallback(async () => {
    if (!user) {
      router.push("/login")
      return
    }

    try {
      if (isTokenExpired()) {
        const refreshed = await refreshToken()
        if (!refreshed) {
          router.push("/login")
          return
        }
      }

      const token = localStorage.getItem("token")
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://linkup-back.vercel.app"

      // Fetch del dashboard directamente al backend
      const response = await fetch(`${backendUrl}/api/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Error response:", errorData)
        throw new Error(errorData.message || "Failed to fetch dashboard data")
      }

      const data = await response.json()
      console.log("Dashboard data received:", data)
      setDashboardData(data)
    } catch (err) {
      console.error("Error fetching dashboard:", err)
      toast({
        title: "Error",
        description: t.error,
        variant: "destructive",
      })
      if (err.message === "Unauthorized") {
        router.push("/login")
      }
    } finally {
      setIsLoading(false)
    }
  }, [toast, router, refreshToken, isTokenExpired, user, t?.error])

  // Fetch de progreso del módulo
  const fetchModuleProgress = async (moduleId) => {
    try {
      const token = localStorage.getItem("token")
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://linkup-back.vercel.app"

      const response = await fetch(`${backendUrl}/api/progress/${moduleId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch module progress")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching module progress:", error)
      toast({
        title: "Error",
        description: "Error al cargar el progreso del módulo",
        variant: "destructive",
      })
    }
  }

  // Actualizar progreso del módulo
  const updateModuleProgress = async (moduleId, progress) => {
    try {
      const token = localStorage.getItem("token")
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://linkup-back.vercel.app"

      const response = await fetch(`${backendUrl}/api/progress/${moduleId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ progress }),
      })

      if (!response.ok) {
        throw new Error("Failed to update module progress")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error updating module progress:", error)
      toast({
        title: "Error",
        description: "Error al actualizar el progreso",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (!loading) {
      fetchDashboardData()
    }
  }, [loading, fetchDashboardData])

  const handleNavigation = useCallback(
    (path) => {
      if (!user) {
        router.push("/login")
        return
      }

      if (isTokenExpired()) {
        refreshToken().then((refreshed) => {
          if (refreshed) {
            router.push(path)
          } else {
            router.push("/login")
          }
        })
      } else {
        router.push(path)
      }
    },
    [router, refreshToken, isTokenExpired, user],
  )
  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 animate-pulse">{t?.loading}</p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push("/login")
    return null
  }

  // Mock data for development
  const mockData = {
    user: {
      firstName: user?.firstName || "Usuario",
      currentModule: 1,
      progress: 10,
      hasCompletedForm: false,
    },
    modules: [
      { id: 1, title: "INTRODUCCIÓN AL MUNDO DE LAS STARTUPS", completed: false },
      { id: 2, title: "Ideation", completed: false },
      { id: 3, title: "Validation", completed: false },
    ],
  }

  const dData = dashboardData || mockData

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="min-h-screen bg-white pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Welcome Section */}
        <motion.div variants={item} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {t.welcome}{" "}
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-blue-600">
              {dData.user.firstName}
            </motion.span>
            <Sparkles className="inline-block w-6 h-6 ml-2 text-yellow-400 animate-pulse" />
          </h1>
        </motion.div>

        {/* Progress Overview */}
        <motion.div variants={item} className="max-w-3xl mx-auto mb-16">
          <Card className="rounded-2xl border border-gray-100 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl flex items-center gap-3">
                <Target className="h-6 w-6 text-blue-600" />
                {t.progress.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6 p-8">
              <div className="w-full space-y-2">
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${dData.user.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {dData.user.progress}% {t.progress.completed}
                </p>
              </div>
              <Button
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300
                         hover:shadow-lg transform hover:scale-[1.02] text-lg py-6 px-12 min-w-[200px]"
                onClick={() => handleNavigation(`/modules/${dData.user.currentModule}`)}
              >
                {t.progress.button}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Initial Form Card - Redesigned */}
        {!dData.user.hasCompletedForm && (
          <motion.div variants={item} className="max-w-3xl mx-auto mb-16">
            <Card className="relative overflow-hidden rounded-2xl border-0 shadow-lg bg-gradient-to-br from-white-50 to-white">
              <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
                <div className="absolute inset-0 bg-blue-100 rounded-full opacity-50 blur-3xl" />
              </div>
              <CardContent className="relative p-8">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <ClipboardCheck className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">¿Listo para comenzar tu viaje emprendedor?</h3>
                    <p className="text-gray-600 mb-4">
                      Completa nuestro formulario inicial para personalizar tu experiencia
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white
                               transition-all duration-300 transform hover:scale-105"
                    >
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScWRQPDp4d46zpURjyL2TovoE81Ypw3eJ9n23c_wfgL50DRLw/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-2"
                      >
                        <FileText className="w-5 h-5" />
                        <span>Completar Formulario</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Bell,
              title: t.quickActions.notifications.title,
              description: t.quickActions.notifications.description,
              button: t.quickActions.notifications.button,
              path: "/mentor-ia",
            },
            {
              icon: MessageCircle,
              title: t.quickActions.contact.title,
              description: t.quickActions.contact.description,
              button: t.quickActions.contact.button,
              path: "/contact",
            },
            {
              icon: Users,
              title: t.quickActions.community.title,
              description: t.quickActions.community.description,
              button: t.quickActions.community.button,
              path: "/community",
            },
          ].map((action, index) => (
            <motion.div key={action.title} variants={item} custom={index}>
              <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl border border-gray-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <action.icon className="mr-2 h-5 w-5 text-blue-600" />
                    {action.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{action.description}</p>
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white
                             transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleNavigation(action.path)}
                  >
                    {action.button}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Modules Overview */}
        <motion.div variants={item} className="pb-12">
          <h2 className="text-3xl font-bold text-center mb-12">{t.modules.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dData.modules.map((module, index) => (
              <motion.div
                key={module.id}
                variants={item}
                custom={index}
                className="group relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300
                         hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100"
                onClick={() => handleNavigation(`/modules/${module.id}`)}
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

