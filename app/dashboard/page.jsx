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

export default function Dashboard() {
  const { user, loading, refreshToken, isTokenExpired } = useAuth()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setDashboardData(data)
        setError(null)
      } else {
        throw new Error("Failed to fetch dashboard data")
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError("Error al cargar los datos del dashboard. Por favor, intenta de nuevo más tarde.")
    } finally {
      setDataLoading(false)
    }
  }

  if (loading || dataLoading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>
  }

  if (!dashboardData) {
    return <div className="flex justify-center items-center h-screen">No se encontraron datos del dashboard</div>
  }

  if (user?.isAdmin) {
    return <AdminDashboard />
  }

  return (
    <div className="container mx-auto px-4 py-8">
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

