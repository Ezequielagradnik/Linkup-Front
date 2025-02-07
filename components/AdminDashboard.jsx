"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, FileText, Settings } from "lucide-react"

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setAdminData(data)
      } else {
        console.error("Failed to fetch admin dashboard data")
      }
    } catch (error) {
      console.error("Error fetching admin dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>
  }

  if (!adminData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error al cargar los datos del dashboard de administrador
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" /> Usuarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{adminData.totalUsers}</p>
            <p className="text-sm text-gray-600">Usuarios registrados</p>
            <Button className="mt-4" asChild>
              <Link href="/admin/users">Gestionar Usuarios</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" /> Aplicaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{adminData.pendingApplications}</p>
            <p className="text-sm text-gray-600">Aplicaciones pendientes</p>
            <Button className="mt-4" asChild>
              <Link href="/admin/applications">Revisar Aplicaciones</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2" /> Configuración
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gestiona la configuración del sistema</p>
            <Button className="mt-4" asChild>
              <Link href="/admin/settings">Configuración del Sistema</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild>
              <Link href="/admin/create-module">Crear Nuevo Módulo</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/reports">Ver Reportes</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/send-notification">Enviar Notificación</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/manage-content">Gestionar Contenido</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

