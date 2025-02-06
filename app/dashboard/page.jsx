"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bell, Book, MessageCircle, Users, FileText, Award, ExternalLink } from "lucide-react"

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else {
      fetchDashboardData()
    }
  }, [user, router])

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
      } else {
        console.error("Failed to fetch dashboard data")
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  if (!dashboardData) {
    return <div>Error al cargar los datos del dashboard</div>
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
          <Button className="mt-4">Continuar Aprendizaje</Button>
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
            <p>Tienes 3 nuevos mensajes del chatbot.</p>
            <Button variant="outline" className="mt-4">
              Ver Notificaciones
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
            <Button variant="outline" className="mt-4">
              Contactar
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
            <Button variant="outline" className="mt-4">
              Unirse a la Comunidad
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
            <Button className="mt-4">Iniciar Guía</Button>
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
            <Button className="mt-4">Comenzar Análisis</Button>
          </CardContent>
        </Card>
      </div>

      {/* Modules Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Módulos del Programa</CardTitle>
        </CardHeader>
        <CardContent>
          {dashboardData.modules.map((module, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-semibold text-lg mb-2">{`${module.order}. ${module.title}`}</h3>
              <ul className="list-disc list-inside ml-4">
                {module.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="text-sm text-gray-600 mb-1">
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

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
            <Button className="mt-4" disabled={dashboardData.user.progress < 100}>
              Formulario de Graduación
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
            <Button className="mt-4" disabled={dashboardData.user.progress < 100}>
              Opciones Post-Graduación
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

