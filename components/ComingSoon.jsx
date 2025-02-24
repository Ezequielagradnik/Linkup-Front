"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Mail, ArrowRight, Star, Sparkles } from 'lucide-react'
import { useState, useEffect } from "react"

export function ComingSoon() {
  const { language } = useLanguage()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const launchDate = new Date('2024-03-15T00:00:00')
      const now = new Date()
      const difference = launchDate - now

      if (difference > 0) {
        setTimeLeft({
          days: 15,
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    })


    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            <Star className="w-3 h-3 text-blue-200" />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full">
        <Card className="bg-white/90 backdrop-blur-xl border-2 border-blue-100/50 shadow-2xl rounded-3xl overflow-hidden">
          <div className="px-8 py-12 md:px-12 md:py-16">
            {/* Logo and sparkle effect */}
            <div className="flex justify-center mb-12 relative">
              <Sparkles className="absolute text-blue-500/20 w-72 h-72 animate-pulse" />
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-2xl animate-pulse" />
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LINKUP-removebg-preview-H4uudgwmEMqvfk5xeTIBJIgVNGQTC1.png"
                  alt="LinkUp Logo"
                  className="relative w-40 h-40 md:w-48 md:h-48 object-contain transform hover:scale-105 duration-500"
                />
              </div>
            </div>

            {/* Text content */}
            <div className="space-y-8 text-center">
              <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 leading-tight animate-fade-in-up">
                {language === "en" ? "Coming Soon" : "Próximamente"}
              </h1>
              
              {/* Countdown timer */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {Object.entries(timeLeft).map(([key, value]) => (
                  <div key={key} className="bg-white/50 backdrop-blur rounded-xl p-4 shadow-lg">
                    <div className="text-3xl md:text-4xl font-bold text-blue-600">{value}</div>
                    <div className="text-sm text-gray-600 capitalize">
                      {language === "en" ? key : 
                        key === "days" ? "días" :
                        key === "hours" ? "horas" :
                        key === "minutes" ? "minutos" : "segundos"}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-gray-600 font-medium animate-fade-in-up delay-200 flex items-center justify-center gap-2">
                  <Calendar className="w-6 h-6" />
                  {language === "en" ? "Launching March 15, 2024" : "Lanzamiento 15 de Marzo, 2024"}
                </p>

                {/* Features preview */}
                <div className="grid md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto mt-8">
                  {[
                    language === "en" ? "Connect with mentors" : "Conecta con mentores",
                    language === "en" ? "Access exclusive content" : "Contenido exclusivo",
                    language === "en" ? "Grow your startup" : "Haz crecer tu startup"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-600">
                      <ArrowRight className="w-5 h-5 text-blue-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Call to action */}
                <div className="pt-8">
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}