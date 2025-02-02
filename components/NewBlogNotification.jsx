"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

export function NewBlogNotification() {
  const [showNotification, setShowNotification] = useState(false)
  const { language } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowNotification(true)
    }, 5000)

    return () => clearTimeout(showTimer)
  }, [])

  useEffect(() => {
    let hideTimer
    if (showNotification) {
      hideTimer = setTimeout(() => {
        setShowNotification(false)
      }, 5000)
    }
    return () => clearTimeout(hideTimer)
  }, [showNotification])

  const handleNotificationClick = () => {
    setShowNotification(false)
    router.push("/blog-podcast")
  }

  const handleCloseClick = (e) => {
    e.stopPropagation()
    setShowNotification(false)
  }

  if (!showNotification) return null

  return (
    <div
      onClick={handleNotificationClick}
      className="fixed bottom-4 right-4 transition-all duration-300 cursor-pointer"
    >
      {/* Mobile version */}
      <div className="md:hidden bg-secondary-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl">
        <Bell className="h-6 w-6" />
      </div>

      {/* Desktop version */}
      <div className="hidden md:flex max-w-sm bg-secondary-500 text-white p-4 rounded-2xl border-2 border-secondary-400 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm items-center gap-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
        <Bell className="h-6 w-6 flex-shrink-0" />
        <span className="flex-grow text-base">
          {language === "en" ? "New blog post available!" : "¡Nuevo post de blog disponible!"}
        </span>
        <Button
          onClick={(e) => {
            e.stopPropagation()
            handleNotificationClick()
          }}
          className="bg-white text-secondary-500 hover:bg-secondary-50 transition-all duration-200 font-semibold py-2 px-4 rounded-full text-sm shadow-md hover:shadow-lg border border-secondary-400"
        >
          {language === "en" ? "Read now" : "Leer ahora"}
        </Button>
        <Button
          onClick={handleCloseClick}
          className="absolute top-1 right-1 p-1 bg-transparent hover:bg-secondary-400 rounded-full transition-colors duration-200"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

