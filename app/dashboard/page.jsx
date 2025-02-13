"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bell, Book, MessageCircle, Users, FileText, Award, ExternalLink } from "lucide-react"
import Link from "next/link"
import ModuleDetails from "@/components/ModuleDetails"

export default function Dashboard() {
  const { user, loading, refreshToken, isTokenExpired } = useAuth()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showInitialForm, setShowInitialForm] = useState(true)

  const fetchDashboardData = async () => {
    try {
      // Mock data - replace with actual API call in production
      const mockData = {
        user: {
          name: "Usuario de Prueba",
          currentModule: 1,
          progress: 25,
        },
        modules: [
          { id: 1, title: "Introducción", completed: true },
          { id: 2, title: "Ideación", completed: false },
          { id: 3, title: "Validación", completed: false },
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
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>
  }

  if (error) {
    console.error("Error loading dashboard data:", error)
    return <div className="text-center text-red-500">Error al cargar los datos del dashboard.</div>
  }

  if (!dashboardData) {
    return <div className="text-center">No se encontraron datos del dashboard.</div>
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
              <CardTitle className="text-2xl md:text-3xl">Bienvenido a LinkUp</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-sm md:text-base">
                Para comenzar con los módulos, primero necesitamos conocerte mejor. Por favor, completa nuestro
                formulario de análisis inicial:
              </p>
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
                  Completar Formulario de Análisis
                </a>
              </Button>
            </CardContent>
          </Card>
        )}

        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Bienvenido de vuelta, {dashboardData.user.name}
        </h1>

        {/* Module Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tu Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base md:text-lg mb-4">Continuar con Módulo {dashboardData.user.currentModule}</p>
            <Progress value={dashboardData.user.progress} className="w-full" />
            <p className="mt-2 text-sm text-gray-600">{dashboardData.user.progress}% completado</p>
            <Button
              className="mt-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all w-full md:w-auto"
              asChild
            >
              <Link href={`/modules/${dashboardData.user.currentModule}`}>Continuar Aprendizaje</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Bell className="mr-2 h-5 w-5" /> Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base mb-4">Tienes 0 nuevos mensajes del chatbot.</p>
              <Button
                variant="outline"
                className="w-full md:w-auto rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                asChild
              >
                <Link href="/notifications">Ver Notificaciones</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MessageCircle className="mr-2 h-5 w-5" /> Contacto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base mb-4">¿Necesitas ayuda? Contáctanos.</p>
              <Button
                variant="outline"
                className="w-full md:w-auto rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                asChild
              >
                <Link href="/contact">Contactar</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5" /> Comunidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base mb-4">Únete a nuestra comunidad de emprendedores.</p>
              <Button
                variant="outline"
                className="w-full md:w-auto rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                asChild
              >
                <Link href="/community">Unirse a la Comunidad</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Book className="mr-2 h-5 w-5" /> Iniciar Guía
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base mb-4">Comienza tu viaje emprendedor con nuestra guía paso a paso.</p>
              <Button
                className="w-full md:w-auto rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
                asChild
              >
                <Link href="/guide">Iniciar Guía</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="mr-2 h-5 w-5" /> Análisis Inicial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base mb-4">Realiza un análisis de tu idea de startup.</p>
              <Button
                className="w-full md:w-auto rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
                asChild
              >
                <Link href="/analysis">Comenzar Análisis</Link>
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
                <Award className="mr-2 h-5 w-5" /> Graduación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base mb-4">Completa todos los módulos y obtén tu diploma de LinkUp.</p>
              <Button
                className="w-full md:w-auto rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all disabled:opacity-50"
                disabled={dashboardData.user.progress < 100}
                asChild
              >
                <Link href="/graduation">Formulario de Graduación</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <ExternalLink className="mr-2 h-5 w-5" /> Post-Graduación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base mb-4">Explora las opciones post-graduación y únete a Vefy.</p>
              <Button
                className="w-full md:w-auto rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all disabled:opacity-50"
                disabled={dashboardData.user.progress < 100}
                asChild
              >
                <Link href="/post-graduation">Opciones Post-Graduación</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

