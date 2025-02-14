"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Card } from "@/components/ui/card"

export function ComingSoon() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 animate-gradient-slow" />

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-blue-500/[0.025]" />
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-50/50 rounded-full blur-3xl" />

      {/* Main content */}
      <Card className="relative max-w-2xl w-full bg-white/70 backdrop-blur-xl border-2 border-blue-100/50 shadow-2xl rounded-3xl">
        <div className="px-8 py-12 md:px-12 md:py-16">
          {/* Logo section */}
          <div className="flex justify-center mb-12 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-2xl transform animate-pulse" />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LINKUP-removebg-preview-H4uudgwmEMqvfk5xeTIBJIgVNGQTC1.png"
                alt="LinkUp Logo"
                className="relative w-40 h-40 md:w-56 md:h-56 object-contain transform transition-transform hover:scale-105 duration-500"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 leading-tight animate-fade-in-up">
              {language === "en" ? "Coming Soon" : "Próximamente"}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-medium animate-fade-in-up delay-200">
              {language === "en" ? "Launching March 15, 2024" : "Lanzamiento 15 de Marzo, 2024"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

