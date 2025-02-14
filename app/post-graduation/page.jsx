"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Card } from "@/components/ui/card"

export default function ComingSoon() {
  const { language } = useLanguage()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2024-03-15T00:00:00")

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full p-8 text-center bg-white/80 backdrop-blur-sm">
        <div className="flex justify-center mb-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LINKUP-removebg-preview-H4uudgwmEMqvfk5xeTIBJIgVNGQTC1.png"
            alt="LinkUp Logo"
            className="w-32 h-32 md:w-40 md:h-40 object-contain"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
          {language === "en" ? "Coming Soon" : "Próximamente"}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {language === "en" ? "Launching March 15, 2024" : "Lanzamiento 15 de Marzo, 2024"}
        </p>
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-2xl md:text-3xl font-bold text-blue-600">{timeLeft.days}</div>
            <div className="text-sm text-gray-600">{language === "en" ? "Days" : "Días"}</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-2xl md:text-3xl font-bold text-blue-600">{timeLeft.hours}</div>
            <div className="text-sm text-gray-600">{language === "en" ? "Hours" : "Horas"}</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-2xl md:text-3xl font-bold text-blue-600">{timeLeft.minutes}</div>
            <div className="text-sm text-gray-600">{language === "en" ? "Minutes" : "Minutos"}</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-2xl md:text-3xl font-bold text-blue-600">{timeLeft.seconds}</div>
            <div className="text-sm text-gray-600">{language === "en" ? "Seconds" : "Segundos"}</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

