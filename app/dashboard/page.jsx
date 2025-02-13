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
import AdminDashboard from "@/components/AdminDashboard"

let setDashboardData // Declare setDashboardData

const fetchDashboardData = async () => {
  // Mock data
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
  setDashboardData(mockData) // Use setDashboardData here
  setDataLoading(false)
}

export default function Dashboard() {
  const { user, loading, refreshToken, isTokenExpired } = useAuth()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState(null) // Declare setDashboardData here
  const [dataLoading, setDataLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showInitialForm, setShowInitialForm] = useState(true)

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
  }, [user, loading, router, refreshToken, isTokenExpired])

  if (loading || dataLoading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>
  }

  if (error) {
    console.error("Error loading dashboard data:", error)
    // Use mock data in case of error
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
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Bienvenido de vuelta, {mockData.user.name}</h1>
        {/* Rest of the component using mockData */}
        {/* Module Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tu Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">Continuar con Módulo {mockData.user.currentModule}</p>
            <Progress value={mockData.user.progress} className="w-full" />
            <p className="mt-2 text-sm text-gray-600">{mockData.user.progress}% completado</p>
            <Button className="mt-4" asChild>
              <Link href={`/modules/${mockData.user.currentModule}`}>Continuar Aprendizaje</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2" /> Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Tienes 0 nuevos mensajes del chatbot.</p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/notifications">Ver Notificaciones</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="mr-2" /> Contacto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>¿Necesitas ayuda? Contáctanos.</p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/contact">Contactar</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2" /> Comunidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Únete a nuestra comunidad de emprendedores.</p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/community">Unirse a la Comunidad</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="mr-2" /> Iniciar Guía
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Comienza tu viaje emprendedor con nuestra guía paso a paso.</p>
              <Button className="mt-4" asChild>
                <Link href="/guide">Iniciar Guía</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" /> Análisis Inicial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Realiza un análisis de tu idea de startup.</p>
              <Button className="mt-4" asChild>
                <Link href="/analysis">Comenzar Análisis</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Modules Overview */}
        <ModuleDetails modules={mockData.modules} currentModule={mockData.user.currentModule} />

        {/* Graduation and Post-Graduation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2" /> Graduación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Completa todos los módulos y obtén tu diploma de LinkUp.</p>
              <Button className="mt-4" disabled={mockData.user.progress < 100} asChild>
                <Link href="/graduation">Formulario de Graduación</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ExternalLink className="mr-2" /> Post-Graduación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Explora las opciones post-graduación y únete a Vefy.</p>
              <Button className="mt-4" disabled={mockData.user.progress < 100} asChild>
                <Link href="/post-graduation">Opciones Post-Graduación</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return <div className="flex justify-center items-center h-screen">No se encontraron datos del dashboard</div>
  }

  if (user?.isAdmin) {
    return <AdminDashboard />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {showInitialForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Bienvenido a LinkUp</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Para comenzar con los módulos, primero necesitamos conocerte mejor. Por favor, completa nuestro formulario
              de análisis inicial:
            </p>
            <Button asChild size="lg">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScWRQPDp4d46zpURjyL2TovoE81Ypw3eJ9n23c_wfgL50DRLw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
                onClick={() => setShowInitialForm(false)}
              >
                <FileText className="w-5 h-5" />
                Completar Formulario de Análisis
              </a>
            </Button>
          </CardContent>
        </Card>
      )}

      <h1 className="text-3xl font-bold mb-8">Bienvenido de vuelta, {dashboardData.user.name}</h1>

      {/* Module Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tu Progreso</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">Continuar con Módulo {dashboardData.user.currentModule}</p>
          <Progress value={dashboardData.user.progress} className="w-full" />
          <p className="mt-2 text-sm text-gray-600">{dashboardData.user.progress}% completado</p>
          <Button className="mt-4" asChild>
            <Link href={`/modules/${dashboardData.user.currentModule}`}>Continuar Aprendizaje</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2" /> Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tienes 0 nuevos mensajes del chatbot.</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/notifications">Ver Notificaciones</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2" /> Contacto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>¿Necesitas ayuda? Contáctanos.</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/contact">Contactar</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" /> Comunidad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Únete a nuestra comunidad de emprendedores.</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/community">Unirse a la Comunidad</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2" /> Iniciar Guía
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Comienza tu viaje emprendedor con nuestra guía paso a paso.</p>
            <Button className="mt-4" asChild>
              <Link href="/guide">Iniciar Guía</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" /> Análisis Inicial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Realiza un análisis de tu idea de startup.</p>
            <Button className="mt-4" asChild>
              <Link href="/analysis">Comenzar Análisis</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Modules Overview */}
      <ModuleDetails modules={dashboardData.modules} currentModule={dashboardData.user.currentModule} />

      {/* Graduation and Post-Graduation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2" /> Graduación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Completa todos los módulos y obtén tu diploma de LinkUp.</p>
            <Button className="mt-4" disabled={dashboardData.user.progress < 100} asChild>
              <Link href="/graduation">Formulario de Graduación</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ExternalLink className="mr-2" /> Post-Graduación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Explora las opciones post-graduación y únete a Vefy.</p>
            <Button className="mt-4" disabled={dashboardData.user.progress < 100} asChild>
              <Link href="/post-graduation">Opciones Post-Graduación</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

