"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

export function NewBlogNotification() {
  const [showNotification, setShowNotification] = useState(false)
  const { language } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    // Aquí puedes implementar la lógica para mostrar la notificación
    // basada en los blogs que manejarás directamente en el frontend
    // Por ahora, simplemente mostraremos la notificación después de un tiempo
    const timer = setTimeout(() => {
      setShowNotification(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleNotificationClick = () => {
    setShowNotification(false)
    router.push("/blog-podcast")
  }

  if (!showNotification) return null

  return (
    <div className="fixed bottom-4 right-4 bg-secondary-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2">
      <Bell className="h-6 w-6" />
      <span>{language === "en" ? "New blog post available!" : "¡Nuevo post de blog disponible!"}</span>
      <Button onClick={handleNotificationClick} variant="outline" size="sm" className="ml-2">
        {language === "en" ? "Read now" : "Leer ahora"}
      </Button>
    </div>
  )
}

// Este componente se encargará de mostrar una notificación en la esquina inferior derecha